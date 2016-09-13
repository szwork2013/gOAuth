var
util = require('util'),
redis = require('./../redis.js');


var KEY = {
    USER         : 'user:id:%s',
    USER_USERNAME: 'user:username:%s'
};

module.exports.createUser = function(user,cb){
    redis.set(util.format(KEY.USER, user.id), JSON.stringify(user),function(err, data) {
        cb(err,data);
    });
};

module.exports.KEY = KEY;

module.exports.getId = function(user) {
    return user.id;
};

var fetchById = function(id, cb) {
    redis.get(util.format(KEY.USER, id),function(err, data) {
        cb(err, data);
    });
};

module.exports.fetchById = fetchById;

module.exports.fetchByUsername = function(username, cb) {
    redis.get(util.format(KEY.USER_USERNAME, username), function(err, userId) {
        if (err) cb(err);
        else if (!userId) cb();
        else {
            fetchById(userId, cb);
        }
    });
};

module.exports.checkPassword = function(user, password, cb) {
    (user.password == password) ? cb(null, true) : cb(null, false);
};

module.exports.fetchFromRequest = function(req) {
    return req.session.user;
};