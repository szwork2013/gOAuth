var
    error = require('./../error');

/**
 * Resource schema is defined by server side logic
 */

/**
 * Create resource object by primary key
 * Should be implemented with server logic
 *
 * @param resource {Object}
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.createResource=function(resource,cb){
    throw new error.serverError('Resource model method "createResource" is not implemented');
}

/**
 * update resource object by primary key
 * Should be implemented with server logic
 *
 * @param resource {Object}
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.updateResource=function(resource,cb){
    throw new error.serverError('Resource model method "updateResource" is not implemented');
}

/**
 * Delete resource object by primary key
 * Should be implemented with server logic
 *
 * @param resourceId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.deleteResource=function(resourceId,cb){
    throw new error.serverError('Resource model method "deleteResource" is not implemented');
}

/**
 * Delete resource object in logic by primary key
 * Should be implemented with server logic
 *
 * @param resourceId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.deleteResourceInLogic=function(resourceId,cb){
    throw new error.serverError('Resource model method "deleteResourceInLogic" is not implemented');
}

/**
 * Get all resources object
 * Should be implemented with server logic
 *
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.getResources=function(cb){
    throw new error.serverError('Resource model method "getResources" is not implemented');
}

/**
 * Gets primary key of the resource
 *
 * @param resource {Object} Resource object
 */
module.exports.getId = function(resource) {
    throw new error.serverError('Resource model method "getId" is not implemented');
};

/**
 * Fetches resource object by primary key
 * Should be implemented with server logic
 *
 * @param resourceId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.fetchById = function(resourceId, cb) {
    throw new error.serverError('Resource model method "fetchById" is not implemented');
};

/**
 * Fetches resource object by primary key
 * Should be implemented with server logic
 *
 * @param resourcename {String} Unique resourcename/login
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.fetchByResourcename = function(resourcename, cb) {
    throw new error.serverError('Resource model method "fetchByResourcename" is not implemented');
};
