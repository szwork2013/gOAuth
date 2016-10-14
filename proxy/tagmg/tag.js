var
util = require('util'),
async = $.async,
redis = $.plug.redis.userdbserver;
var uuid = require('node-uuid');

var KEY = {
    TAG         : 'tag:%s',
    TAG_TAGNAME: 'tag:tagname:%s'
};

/**/
module.exports.createtag = (tag,callback) => {
    //todo:
    //1. 保存数据入MySQL
    //2. 同时保存key='tag:id:%s',入redis.
    var id;
    async.waterfall([
            //检察请求参数完整性
        function (cb) {
            // if (!para || !para.username || !para.password)
            //     return cb($.plug.resultformat(30001, "Username and password is mandatory"));
            cb();
        },
        function (cb) {
            if(!tag.id)
            {
                tag.id = uuid.v4();
                id = tag.id;
                $.db.mysql.gd.query("\
                INSERT INTO `tag`\
                    (`id`,\
                     `name`,\
                     `desc`,\
                     `status`)\
                VALUES \
                    ('{0}', \
                    '{1}', \
                    '{2}', \
                    {3}); \
                ".format(
                    tag.id,
                    tag.name,
                    tag.desc,
                    tag.status
                ), (err) => {
                   if (err) return callback($.plug.resultformat(40001, err));
                });
            }else{
                id = tag.id;
                $.db.mysql.gd.query("\
                UPDATE `tag`\
                SET\
                    `name` = '{1}',\
                    `desc` = '{2}',\
                    `status` = {3}\
                WHERE `id` = '{0}';\
                ".format(
                    tag.id,
                    tag.name,
                    tag.desc,
                    tag.status
                ), (err) => {
                   if (err) return callback($.plug.resultformat(40001, err));
                });
            }
            cb();
        },
        function (cb) {
            //保存进入redis,可选
            redis.hmset(util.format(KEY.TAG, tag.id), tag,(err, data)=>{
                //if (err) return cb($.plug.resultformat(40001, err));
                cb();
            });
        }
    ],
    function (err) {
        if (err) {
            callback(err);
        } else {
            callback($.plug.resultformat(0, '',tag));
        }
    });
};

/*分页获取所有的标签*/
module.exports.alltags = (para, callback) =>{
    async.waterfall([
        //检察请求参数完整性
        function (cb) {
            if (!para.from || !para.size||!Number(para.from)||!Number(para.size))
                return cb($.plug.resultformat(40001, "from and size is mandatory, and should be number"));
            cb();
        },
        //获取分页后的Key
        function (cb) {
            var sql = "\
                select \
                    `id`,\
                    `name`,\
                    `desc`,\
                    `status`\
                from `tag`\
                WHERE (ifnull('{0}','') = '' or name like '%{0}%')\
                    and (ifnull({1},'') = '' or status = {1})\
                    limit {2},{3};\
                ".format(
                    para.name,
                    para.status,
                    para.from-1,
                    para.size
                );
            $.db.mysql.gd.query(sql, (err, data) => {
                   if (err) return callback($.plug.resultformat(40001, err));
                   return cb(null,data);
            });
            // var from = para.from - 1;
            // var size = Number(para.from) + Number(para.size) - 1;

            // redis.keys(util.format(KEY.TAG,"*"),(err, data) => {
            //     if (err) return cb($.plug.resultformat(40001, err));
                
            //     for(var i = from;i < size; i++ ) {
            //        if(i > data.length) return cb();
            //        if(data[i])
            //        {
            //           keys.push(data[i]);
            //        }
            //     };
            //     cb();
            // });
        },
        //获取tags
        function (data, cb) {
            var sql = "\
                select count(1) as count\
                from `tag`\
                WHERE (ifnull('{0}','') = '' or name like '%{0}%')\
                    and (ifnull({1},'') = '' or status = {1});\
                ".format(
                    para.name,
                    para.status,
                    para.from-1,
                    para.size
                );
            $.db.mysql.gd.query(sql, (err, countdata) => {
                if (err) return callback($.plug.resultformat(40001, err));
                return cb(null,{
                    count: countdata[0].count,
                    result: data
                });
            });
            // async.each(keys,(formatid, callback) => {
            //     fetchtagbyid(formatid, (err, data)=>{
            //         list.push(data);
            //         callback();
            //     });
            // },(err)=> {
            //     if (err) return cb($.plug.resultformat(40001, err));
            //     cb();
            // });
        }],
        function (err, data) {
            if (err) {
               callback(err);
            } else {
                callback($.plug.resultformat(0,'', data));
            }
    });
};

/*根据标签ID获取标签信息*/
module.exports.tagbyid = (id, callback) =>{
    $.db.mysql.gd.query("\
                select \
                    `id`\
                    `name`,\
                    `desc`,\
                    `status`\
                from `tag`\
                WHERE id = '{0}';\
                ".format(id), (err, data) => {
        if (err) return callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, "", data[0] ));
     });
};
