module.exports = $.redis.createClient($.config.redis.oauthserver);

// No need to wait data load
//require('./data.js').initialize();