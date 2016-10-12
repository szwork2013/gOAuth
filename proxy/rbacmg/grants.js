var
util = require('util'),
async = $.async,
redis = $.plug.redis.sessionserver;

var KEY = {
    ROLE_RESOURCES : 'role_resources:%s',
    USER_ROLES: 'user_roles:%s',
    URER_RESOURCES: 'user_resources:%s',
    ROLE         : 'role:%s',
    USER         : 'user:%s',
    RESOURCE         : 'resource:%s'
};

module.exports.KEY = KEY;

module.exports.createrole_resources = (para,callback) => {
    var redis_id;
    
    async.waterfall([
        //检察请求参数完整性
        function (cb) {
            if (!para||!para.id||!para.resources)
               return cb($.plug.resultformat(40001, "roleid and resources are mandatory"));
            cb();
        },
        //检察权限是否存在
        function (cb) {
            redis_id = util.format(KEY.ROLE_RESOURCES, para.id);

            redis.hkeys(util.format(KEY.ROLE, para.id),(err,data)=>{
               if (err||data.length == 0)
                  return cb($.plug.resultformat(40001, "The role is not existed"));
                cb(); 
            });
        },
        //检察资源是否存在
        function (cb) {
            //todo 检察资源是否存在
            cb();
        },
        //创建或者更新权限资源数据
        function (cb) {
            redis.set(redis_id, JSON.stringify(para.resources),(err, data) => {
                if (err) return cb($.plug.resultformat(40001, err));
                cb();
            });
        }],
        function (err) {
            if (err) {
               callback(err);
            } else {
                callback($.plug.resultformat(0,''));
            }
    });
};

module.exports.createuser_roles = (para,callback) => {
    var redis_id,resources;

    async.waterfall([
        //检察请求参数完整性
        function (cb) {
            if (!para||!para.id||!para.roles)
               return cb($.plug.resultformat(40001, "userid and roles are mandatory"));
            cb();
        },
        //检察用户是否存在
        function (cb) {
            redis_id = util.format(KEY.USER_ROLES, para.id);

            redis.hkeys(util.format(KEY.USER, para.id),(err,data)=>{
               if (err||data.length == 0)
                  return cb($.plug.resultformat(40001, "The user is not existed"));
                cb(); 
            });
        },
        //检察角色是否存在
        function (cb) {
            //todo 检察角色是否存在
            cb();
        },
        //创建或者更新权限资源数据
        function (cb) {
            redis.set(redis_id, JSON.stringify(para.roles),(err, data) => {
                if (err) return cb($.plug.resultformat(40001, err));
                createuser_resources(para.id,(data) => {
                    cb();
                });
            });
        }],
        function (err) {
            if (err) {
               callback(err);
            } else {
               callback($.plug.resultformat(0,''));
            }
    });
};

var createuser_resources = (id,callback) => {
    var redis_id,resources=[];

    async.waterfall([
        //获取所有角色下资源
        function (cb) {
            redis.get(util.format(KEY.USER_ROLES, id),(err, rolesdata) => {
                if (err||!rolesdata) return cb(err);

                async.each(JSON.parse(rolesdata),(roleid, rcallback) => {
                   redis.get(util.format(KEY.ROLE_RESOURCES, roleid),(err, resourcesdata) => {

                   if(resourcesdata && JSON.parse(resourcesdata).length>0)
                   {
                      async.each(JSON.parse(resourcesdata), (resourceid, rscallback) => {
                        resources.push(resourceid);
                        rscallback();
                      },(err) =>{

                      });
                   }

                   rcallback();
                 });
                },(err) => {
                   cb();
                });
            });
        },
        //创建或者更新权限资源数据
        function (cb) {
            redis.set(util.format(KEY.URER_RESOURCES, id), JSON.stringify(resources.removeDup3()),(err, data) => {
                if(err) return cb();
                cb();
            });
        }],
        function (err) {
            callback(resources);
    });
};

// module.exports.createuser_resources = (para,callback) => createuser_resources;
module.exports.user_roles_resources = (id,callback) => {
    var user_roles_id = util.format(KEY.USER_ROLES, id);
    var user_resources_id = util.format(KEY.URER_RESOURCES, id);
    var userdata={
        id:id,
        roles:[],
        resources:[]
    };

    redis.get(user_roles_id, (err, data) => {
        userdata.roles = JSON.parse(data);
        redis.get(user_resources_id, (err, data) => {
            userdata.resources = JSON.parse(data);
            callback($.plug.resultformat(0, "", userdata)); 
        });
    });
}