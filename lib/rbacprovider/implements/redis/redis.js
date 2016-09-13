var
    redis = require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);

module.exports = redis.createClient({
            host: "172.28.189.101",
            port: 6379,
            db: 1
        });

// No need to wait data load
//require('./data.js').initialize();
