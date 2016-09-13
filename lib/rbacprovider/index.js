var
    abstracts = require('./abstracts/');

var rbac = function(options) {
    var _self = this;

    options = options || {};

    options.log = options.log || {
        level: 0,
        color: true
    };

    this.options = options;

    // Initialize objects (available for redefinition)
    //this.logger = new logger(this.options.log);
    this.abstracts = abstracts;
    this.user = abstracts.user;

    //this.logger.info('rbac library initialized');
};

module.exports.rbac = rbac;


// Define methods
module.exports = function(type) {
    var obj = new rbac({log: {level: 4}});

    var implements = require('./implements/' + type).rbac;
    if (!implements)
        throw new Error('Unknown model type: ' + type);

    // Redefine oauth20 abstract methods
    // User
    obj.abstracts.user.createUser = implements.user.createUser;
    obj.abstracts.user.getId = implements.user.getId;
    obj.abstracts.user.fetchById = implements.user.fetchById;
    // obj.abstracts.user.fetchByUsername = implements.user.fetchByUsername;
    // obj.abstracts.user.fetchFromRequest = implements.user.fetchFromRequest;
    // obj.abstracts.user.checkPassword = implements.user.checkPassword;

    return obj;
};


