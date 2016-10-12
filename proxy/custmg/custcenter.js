var uuid = require('node-uuid');
var
util = require('util'),
async = $.async,
redis = $.plug.redis.sessionserver;

var KEY = {
    USER         : 'user:%s',
    USER_USERNAME: 'user:username:%s'
};

/*用户中心－开放登录*/
exports.login = (para, callback) =>
{
    var user, userSession;

    async.waterfall([
            //检察请求参数完整性
            function (cb) {
                if (!para || !para.username || !para.password)
                    return cb($.plug.resultformat(30001, "Username and password is mandatory"));
                cb();
            },
            //获取用户信息
            function (cb) {
                user = {
                    id: "userId",
                    name: "userName",
                    value: {
                        resourceValue: 6,
                        actionsValue: 256
                    },
                    password: "1111",
                    extentions: {}
                };
                if (!user || user.name != para.username) return cb($.plug.resultformat(30002, "User is not existed"));
                cb();
            },
            //验证码验证
            function (cb) {
                //todo check code-generation service, if code is required.
                var isrequired = false;
                if (isrequired&&(!para.code || para.code!="1234")) return cb($.plug.resultformat(30005, "Code is requiered or incorrect"));
                cb();
            },
            //账户异常
            function (cb) {
                //账户异常
                var isrequired = false;
                if (isrequired) return cb($.plug.resultformat(30007, "The account is innormal"));
                cb();
            },
            //获取权限
            function (cb) {
                if (user.password != para.password)return cb($.plug.resultformat(30003, "Either username or password is incorrect"));
                userSession = {
                    user: {
                        id: 'userId',
                        name: 'userName',
                        value: {
                            resourceValue: 6,
                            actionsValue: 256
                        },
                        extentions: {}
                    },
                    roles: [
                        {
                            id: 'roleId',
                            name: 'admin'
                        }
                    ],
                    resources: [
                        {
                            id: 'resourceId',
                            name: 'point.pointlist',
                            value: 2,
                            resource: '/point/pointlist.html'
                        }
                    ],
                    actions: [
                        {
                            id: 'actionId',
                            name: 'point.getpoint',
                            value: 32,
                            action: '/point/pointlist'
                        }
                    ]
                };
                cb();
            }
        ],
        function (err) {
            if (err) {
                callback(err);
            } else {
                callback($.plug.resultformat(0, '', userSession));
            }
        });
}

/*用户中心－开放注册*/
exports.register = (para, callback) =>
{
    var user, userSession, userid;

    async.waterfall([
            //检察请求参数完整性
            function (cb) {
                if (!para || !para.username||!para.password)
                   return cb($.plug.resultformat(30001, "Username, password, mobile is mandatory"));
                cb();
            },
            //获取是否已经注册过
            function (cb) {
                redis.get(util.format(KEY.USER_USERNAME, para.username), (err, data) =>{
                    userid = data
                    if(userid) return cb($.plug.resultformat(30006, "User is already existing"));
                    else return cb();
                });
            },
            //验证码验证
            function (cb) {
                //todo check code-generation service, if code is required.
                var isrequired = false;
                if (isrequired && (!para.code || para.code!="1234")) return cb($.plug.resultformat(30005, "Code is requiered or incorrect"));
                cb();
            },
            //用户添加
            function (cb) {
                para.type ="0";
                user = {
                    id: uuid.v4(),
                    name: para.username,
                    password: para.password,
                    mobile: para.password,
                    type: para.type,
                    extentions: "para.profile"
                };

                redis.hmset(util.format(KEY.USER, user.id), user,(err, data)=>{
                    if (err) return cb($.plug.resultformat(40001, err));
                    redis.set(util.format(KEY.USER_USERNAME, user.name),user.id);
                });
                cb();
            },
            //授权默认权限
            function (cb) {
                //todo add default roles and resources
                cb();
            }
        ],
        function (err) {
            if (err) {
                callback(err);
            } else {
                callback($.plug.resultformat(0, '', {id:user.id}));
            }
        });
}

/*用户中心－用户信息更新*/
// exports.profileupdate = (para, callback) =>
// {
//     callback();
// }

/*用户中心－忘记密码*/
// exports.forgetpassword = (para, callback) =>
// {
//     callback();
// }

/*用户中心－密码修改*/
exports.changepassword = (para, callback) =>
{
    var user, userSession;

    async.waterfall([
            //检察请求参数完整性
            function (cb) {
                if (!para || !para.username||!para.password||!para.mobile)
                    return cb($.plug.resultformat(30001, "Username, password, mobile is mandatory"));
                cb();
            },
            //获取是否已经注册过
            function (cb) {
                user = {
                    id: "userId",
                    name: "userName",
                    value: {
                        resourceValue: 6,
                        actionsValue: 256
                    },
                    password: "1111",
                    extentions: {}
                };
                if (!user || user.name == para.username || user.mobile == para.mobile) return cb($.plug.resultformat(30006, "User is already existing"));
                cb();
            },
            //验证码验证
            function (cb) {
                //todo check code-generation service, if code is required.
                var isrequired = false;
                if (isrequired&&(!para.code || para.code!="1234")) return cb($.plug.resultformat(30005, "Code is requiered or incorrect"));
                cb();
            },
            //密码匹配，新密码规则匹配
            function (cb) {
                if (user.password != para.password)return cb($.plug.resultformat(30008, "Originl password is incorrect"));
                cb();
            },
            //密码重置
            function (cb) {
                //todo 修改密码，重置session、缓存等信息。
                cb();
            }
        ],
        function (err) {
            if (err) {
                callback(err);
            } else {
                callback($.plug.resultformat(0, ''));
            }
        });
}

/*用户中心－用户认证*/
exports.verify = (para, callback) =>
{
    callback();
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.codegenerate = (para, callback) =>
{
   var code = getRandomInt(1000,9999);
   callback($.plug.resultformat(0, '',{code:code}));
}











