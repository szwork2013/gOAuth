var
util = require('util'),
async = $.async,
redis = $.plug.redis.userdbserver;

var KEY = {
    USER         : 'user:%s',
    USER_USERNAME: 'username:%s'
};

module.exports.KEY = KEY;

/**/
module.exports.createuser = (user,callback) => {
    //todo:
    //1. 保存数据入MySQL
    //2. 同时保存key='user:id:%s',入redis.
    redis.hmset(util.format(KEY.USER, user.id), user,(err, data)=>{
        if (err) return callback($.plug.resultformat(40001, err));
        redis.set(util.format(KEY.USER_USERNAME, user.name),user.id);
        callback($.plug.resultformat(0, ""));
    });
};

/*分页获取所有的用户*/
module.exports.allusers = (para, callback) =>{
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
            redis.keys(util.format(KEY.USER,"*"),(err, data) => {
                if (err) return cb($.plug.resultformat(40001, err));
                
                for(var i = from ;i < size ; i++ ) {
                   if(i > data.length) return cb();
                   if(data[i])
                   {
                      keys.push(data[i]);
                   }
                };
                cb();
            });
        },
        //获取users
        function (cb) {
            async.each(keys,(formatid, callback) => {
                fetchuserbyid(formatid, (err, data)=>{
                    if(data) list.push(data);
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

/*获取单个用户信息*/
var fetchuserbyid = (formatid, callback) =>{
    redis.hgetall(formatid,(err, data) =>{
        if (err) return callback(err);
        callback(null,data);
    });
};

module.exports.userbyid = (id, callback) =>{
    fetchuserbyid(util.format(KEY.USER,id),(err, data)=>{
        if (err) callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, "",data));
    });
};

module.exports.useridbyname = (name, callback) =>{
    redis.get(util.format(KEY.USER_USERNAME, name),(err, data) =>{
        if (err) callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, "",{id:data}));
    });
};



