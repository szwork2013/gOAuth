var
util = require('util'),
redis = $.plug.sessionserver;

var KEY = {
    RESOURSE         : 'resource:id:%s',
    RESOURSE_RESOURSENAME: 'resource:resourcename:%s'
};

module.exports.KEY = KEY;

/**/
module.exports.resourceinit = (resource,cb) => {
    redis.set(util.format(KEY.RESOURSE, resource.id), JSON.stringify(resource),(err, data)=>{
        if (err) return cb(err,data);
        redis.set(util.format(KEY.RESOURSE_RESOURSENAME, resource.resourcename), resource.id, (err, data) => {
            cb(err, data);
        });
    });
};

/**/
module.exports.getId = (resource) =>{
    return resource.id;
};

/**/
var fetchById = (resourceId, cb) =>{
    redis.get(util.format(KEY.RESOURSE, resourceId),(err, data) =>{
        cb(err, data);
    });
};
module.exports.fetchById = fetchById;

/**/
module.exports.fetchByResourcename = (resourcename, cb) => {
    redis.get(util.format(KEY.RESOURSE_RESOURSENAME, resourcename), (err, resourceId) => {
        fetchById(resourceId, cb);
    });
};


module.exports.deleteResource = (resourceId, cb) => {
    redis.del(util.format(KEY.RESOURSE, resourceId), (err, data) => {
        cb(err, data);
    });
};