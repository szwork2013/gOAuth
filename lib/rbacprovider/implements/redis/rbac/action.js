var
util = require('util'),
redis = require('./../redis.js');

var KEY = {
    ACTION         : 'action:id:%s',
    ACTION_ACTIONNAME: 'action:actionname:%s'
};

module.exports.KEY = KEY;

/**/
module.exports.createAction = (action,cb) => {
    redis.set(util.format(KEY.ACTION, action.id), JSON.stringify(action),(err, data)=>{
        if (err) return cb(err,data);
        redis.set(util.format(KEY.ACTION_ACTIONNAME, action.actionname), action.id, (err, data) => {
            cb(err, data);
        });
    });
};

/**/
module.exports.getId = (action) =>{
    return action.id;
};

/**/
var fetchById = (actionId, cb) =>{
    redis.get(util.format(KEY.ACTION, actionId),(err, data) =>{
        cb(err, data);
    });
};
module.exports.fetchById = fetchById;

/**/
module.exports.fetchByActionname = (actionname, cb) => {
    redis.get(util.format(KEY.ACTION_ACTIONNAME, actionname), (err, actionId) => {
        fetchById(actionId, cb);
    });
};


module.exports.deleteAction = (actionId, cb) => {
    redis.del(util.format(KEY.ACTION, actionId), (err, data) => {
        cb(err, data);
    });
};