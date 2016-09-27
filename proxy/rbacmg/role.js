var
util = require('util'),
redis = $.plug.sessionserver;

var KEY = {
    ROLE         : 'role:id:%s',
    ROLE_ROLENAME: 'role:rolename:%s'
};

module.exports.KEY = KEY;

/**/
module.exports.createRole = (role,cb) => {
    redis.set(util.format(KEY.ROLE, role.id), JSON.stringify(role),(err, data)=>{
        if (err) return cb(err,data);
        redis.set(util.format(KEY.ROLE_ROLENAME, role.rolename), role.id, (err, data) => {
            cb(err, data);
        });
    });
};

/**/
module.exports.getId = (role) =>{
    return role.id;
};

/**/
var fetchById = (roleId, cb) =>{
    redis.get(util.format(KEY.ROLE, roleId),(err, data) =>{
        cb(err, data);
    });
};
module.exports.fetchById = fetchById;

/**/
module.exports.fetchByRolename = (rolename, cb) => {
    redis.get(util.format(KEY.ROLE_ROLENAME, rolename), (err, roleId) => {
        fetchById(roleId, cb);
    });
};


module.exports.deleteRole = (roleId, cb) => {
    redis.del(util.format(KEY.ROLE, roleId), (err, data) => {
        cb(err, data);
    });
};