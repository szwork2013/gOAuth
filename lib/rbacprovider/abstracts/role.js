var
    error = require('./../error');

/**
 * Role schema is defined by server side logic
 */

/**
 * Create role object by primary key
 * Should be implemented with server logic
 *
 * @param role {Object}
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.createRole=function(role,cb){
    throw new error.serverError('Role model method "createRole" is not implemented');
}

/**
 * update role object by primary key
 * Should be implemented with server logic
 *
 * @param role {Object}
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.updateRole=function(role,cb){
    throw new error.serverError('Role model method "updateRole" is not implemented');
}

/**
 * Delete role object by primary key
 * Should be implemented with server logic
 *
 * @param roleId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.deleteRole=function(roleId,cb){
    throw new error.serverError('Role model method "deleteRole" is not implemented');
}

/**
 * Delete role object in logic by primary key
 * Should be implemented with server logic
 *
 * @param roleId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.deleteRoleInLogic=function(roleId,cb){
    throw new error.serverError('Role model method "deleteRoleInLogic" is not implemented');
}

/**
 * Get all roles object
 * Should be implemented with server logic
 *
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.getRoles=function(cb){
    throw new error.serverError('Role model method "getRoles" is not implemented');
}

/**
 * Gets primary key of the role
 *
 * @param role {Object} Role object
 */
module.exports.getId = function(role) {
    throw new error.serverError('Role model method "getId" is not implemented');
};

/**
 * Fetches role object by primary key
 * Should be implemented with server logic
 *
 * @param roleId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.fetchById = function(roleId, cb) {
    throw new error.serverError('Role model method "fetchById" is not implemented');
};

/**
 * Fetches role object by primary key
 * Should be implemented with server logic
 *
 * @param rolename {String} Unique rolename/login
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.fetchByRolename = function(rolename, cb) {
    throw new error.serverError('Role model method "fetchByRolename" is not implemented');
};
