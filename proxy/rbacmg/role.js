var
util = require('util'),
async = $.async,
redis = $.plug.redis.userdbserver;

var KEY = {
    ROLE         : 'role:%s',
    ROLE_ROLENAME: 'role:rolename:%s'
};

/**/
module.exports.createrole = (role,callback) => {
    //todo:
    //1. 保存数据入MySQL
    //2. 同时保存key='role:id:%s',入redis.
    redis.hmset(util.format(KEY.ROLE, role.id), role,(err, data)=>{
        if (err) return callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, ""));
    });
};

/*分页获取所有的角色*/
module.exports.allroles = (para, callback) =>{
    var keys = [],list = [];
    async.waterfall([
        //检察请求参数完整性
        function (cb) {
            if (!para.from || !para.size||!Number(para.from)||!Number(para.size))
                return cb($.plug.resultformat(40001, "from and size is mandatory, and should be number"));
            cb();
        },
        //获取分页后的Key
        function (cb) {
            var from = para.from - 1;
            var size = Number(para.from) + Number(para.size) - 1;

            redis.keys(util.format(KEY.ROLE,"*"),(err, data) => {
                if (err) return cb($.plug.resultformat(40001, err));
                
                for(var i = from;i < size; i++ ) {
                   if(i > data.length) return cb();
                   if(data[i])
                   {
                      keys.push(data[i]);
                   }
                };
                cb();
            });
        },
        //获取roles
        function (cb) {
            async.each(keys,(formatid, callback) => {
                fetchrolebyid(formatid, (err, data)=>{
                    list.push(data);
                    callback();
                });
            },(err)=> {
                if (err) return cb($.plug.resultformat(40001, err));
                cb();
            });
        }],
        function (err) {
            if (err) {
               callback(err);
            } else {
                callback($.plug.resultformat(0,'', list));
            }
    });
};

/*获取单个角色信息*/
var fetchrolebyid = (formatid, callback) =>{
    redis.hgetall(formatid,(err, data) =>{
        if (err) return callback(err);
        callback(null,data);
    });
};

module.exports.rolebyid = (id, callback) =>{
    fetchrolebyid(util.format(KEY.ROLE,id),(err, data)=>{
        if (err) callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, "",data));
    });
};

/*删除单个角色信息*/
module.exports.deleteRole = (id, callback) => {
    redis.del(util.format(KEY.ROLE, id), (err, data) => {
        callback(err, data);
    });
};