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
module.exports.createtag = (tag, callback) => {
    //todo:
    //1. 保存数据入MySQL
    //2. 同时保存key='tag:id:%s',入redis.
    var id,sql;
    async.waterfall([
            //检察请求参数完整性
        function (cb) {
            if (!tag || !tag.name || !tag.status)
                return cb($.plug.resultformat(30001, "name／status is mandatory"));

            if(!tag.id)
            {
                tag.id = uuid.v4();
                sql = "\
                    INSERT INTO `tag`\
                        (`id`,\
                         `name`,\
                         `desc`,\
                         `status`,\
                         `create_dt`,\
                         `create_user`)\
                    VALUES \
                        ('{0}', \
                        '{1}', \
                        '{2}', \
                        {3},\
                        UNIX_TIMESTAMP(),\
                        '{4}'); \
                    ".format(
                        tag.id,
                        tag.name,
                        tag.desc,
                        tag.status,
                        'admin');//todo 修改成当前操作用户
            } else {
                sql = "\
                    UPDATE `tag`\
                    SET\
                        `name` = '{1}',\
                        `desc` = '{2}',\
                        `status` = {3},\
                        `modify_dt` = UNIX_TIMESTAMP(),\
                        `modify_user` = '{4}'\
                    WHERE `id` = '{0}';\
                    ".format(
                        tag.id,
                        tag.name,
                        tag.desc,
                        tag.status,
                        'admin');//todo 修改成当前操作用户
            }
            cb();
        },
        function (cb) {
             $.db.mysql.gd.query(sql, (err) => {
                if (err) return cb($.plug.resultformat(40001, err));

                cb();
            });
        },
        function (cb) {
            //保存进入redis,可选
            //redis.hmset(util.format(KEY.TAG, tag.id), tag,(err, data)=>{
                //if (err) return cb($.plug.resultformat(40001, err));
            cb();
            //});
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
    var sql;
    async.waterfall([
        //检察请求参数完整性
        function (cb) {
            if (!para.from || !para.size||!Number(para.from)||!Number(para.size))
                return cb($.plug.resultformat(40001, "from and size is mandatory, and should be number"));

            sql = "\
                select `id`\
                from `tag`\
                where 1=1 ";

            if(para.name){
                sql += " and name like '{0}%' ".format(para.name);
            }else if(para.status){
                sql += " and status = {0} ".format(para.status);
            }

            cb();
        },
        //获取分页后的Key
        function (cb) {
            var papgingsql = "\
                select \
                    `id`,\
                    `name`,\
                    `desc`,\
                    `status`,\
                    `create_dt`,\
                    `modify_user`,\
                    `modify_dt`,\
                    `modify_user`\
                from `tag`\
                where `id` in ({0})\
                order by `create_dt` desc\
                limit {1},{2};\
                ".format(
                    sql,
                    para.from - 1,
                    para.size
                );
  
            $.db.mysql.gd.query(papgingsql, (err, data) => {
                   if (err) return cb($.plug.resultformat(40001, err));
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
            // WHERE (ifnull('{0}','') = '' or name like '%{0}%')\
                //     and (ifnull({1},'') = '' or status = {1});\
           sql = "\
                select count(1) as count\
                from `tag`\
                where 1=1 ";

            if(para.name){
                sql += " and name like '{0}%' ".format(para.name);
            }else if(para.status){
                sql += " and status = {0} ".format(para.status);
            }

            $.db.mysql.gd.query(sql, (err, countdata) => {
                if (err) return cb($.plug.resultformat(40001, err));
                
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
    var sql = "\
               select \
                    `id`,\
                    `name`,\
                    `desc`,\
                    `status`,\
                    `create_dt`,\
                    `modify_user`,\
                    `modify_dt`,\
                    `modify_user`\
                from `tag`\
                WHERE id = '{0}';\
                ".format(id);

    $.db.mysql.gd.query(sql, (err, data) => {
        if (err) return callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, "", data[0] ));
     });
};
