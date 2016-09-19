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
    this.role = abstracts.role;
    this.resource = abstracts.resource;
    this.action = abstracts.action;


    
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
    obj.abstracts.user.fetchByUsername = implements.user.fetchByUsername;
    obj.abstracts.user.deleteUser = implements.user.deleteUser;

    //Role
    obj.abstracts.role.createRole = implements.role.createRole;
    obj.abstracts.role.getId = implements.role.getId;
    obj.abstracts.role.fetchById = implements.role.fetchById;
    obj.abstracts.role.fetchByRolename = implements.role.fetchByRolename;
    obj.abstracts.role.deleteRole = implements.role.deleteRole;

    //Resource
    obj.abstracts.resource.createResource = implements.resource.createResource;
    obj.abstracts.resource.getId = implements.resource.getId;
    obj.abstracts.resource.fetchById = implements.resource.fetchById;
    obj.abstracts.resource.fetchByResourcename = implements.resource.fetchByResourcename;
    obj.abstracts.resource.deleteResource = implements.resource.deleteResource;

     //Action
    obj.abstracts.action.createAction = implements.action.createAction;
    obj.abstracts.action.getId = implements.action.getId;
    obj.abstracts.action.fetchById = implements.action.fetchById;
    obj.abstracts.action.fetchByActionname = implements.action.fetchByActionname;
    obj.abstracts.action.deleteAction = implements.action.deleteAction;
    
    return obj;
};


