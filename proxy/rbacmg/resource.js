var
util = require('util'),
async = $.async,
redis = $.plug.redis.userdbserver;

var KEY = {
    RESOURCE         : 'resource:%s',
    RESOURCE_NAME: 'resource:resourcename:%s'
};

module.exports.KEY = KEY;

/**/
module.exports.createresource = (resource,callback) => {
    //todo:
    //1. 保存数据入MySQL
    //2. 同时保存key='resource:id:%s',入redis.
    redis.hmset(util.format(KEY.RESOURCE, resource.id), resource,(err, data)=>{
        if (err) return callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, ""));
    });
};

/*分页获取所有的资源*/
module.exports.allresources = (para, callback) =>{
    var keys = [],list = [];
    async.waterfall([
        //检察请求参数完整性
        function (cb) {
            if (!para.from || !para.size)
                return cb($.plug.resultformat(40001, "from and size is mandatory"));
            cb();
        },
        //获取分页后的Key
        function (cb) {
            redis.keys(util.format(KEY.RESOURCE,"*"),(err, data) => {
                if (err) return cb($.plug.resultformat(40001, err));
                
                for(var i = para.from - 1 ;i < para.size && i < data.length; i++ ) {
                   if(data[i])
                   {
                      keys.push(data[i]);
                   }
                };
                cb();
            });
        },
        //获取resources
        function (cb) {
            async.each(keys,(formatid, callback) => {
                fetchresourcebyid(formatid, (err, data)=>{
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

/*获取单个资源信息*/
var fetchresourcebyid = (formatid, callback) =>{
    redis.hgetall(formatid,(err, data) =>{
        if (err) return callback(err);
        callback(null,data);
    });
};

module.exports.resourcebyid = (id, callback) =>{
    fetchresourcebyid(util.format(KEY.RESOURCE,id),(err, data)=>{
        if (err) callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, "",data));
    });
};

/*删除单个资源信息*/
module.exports.deleteRole = (id, callback) => {
    redis.del(util.format(KEY.RESOURCE, id), (err, data) => {
        callback(err, data);
    });
};