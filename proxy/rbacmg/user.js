var
util = require('util'),
redis = $.plug.sessionserver;

var KEY = {
    USER         : 'user:id:%s',
    USER_USERNAME: 'user:username:%s'
};

module.exports.KEY = KEY;

/**/
module.exports.createUser = (user,cb) => {
    redis.set(util.format(KEY.USER, user.id), JSON.stringify(user),(err, data)=>{
        if (err) return cb(err,data);
        redis.set(util.format(KEY.USER_USERNAME, user.username), user.id, (err, data) => {
            cb(err, data);
        });
    });
};

/**/
module.exports.getId = (user) =>{
    return user.id;
};

/**/
var fetchById = (userId, cb) =>{
    redis.get(util.format(KEY.USER, userId),(err, data) =>{
        cb(err, data);
    });
};
module.exports.fetchById = fetchById;

/**/
module.exports.fetchByUsername = (username, cb) => {
    redis.get(util.format(KEY.USER_USERNAME, username), (err, userId) => {
        fetchById(userId, cb);
    });
};


module.exports.deleteUser = (userId, cb) => {
    redis.del(util.format(KEY.USER, userId), (err, data) => {
        cb(err, data);
    });
};

/**/
module.exports.checkPassword = function(user, password, cb) {
    (user.password == password) ? cb(null, true) : cb(null, false);
};