var
    error = require('./../error');

/**
 * Action schema is defined by server side logic
 */

/**
 * Create action object by primary key
 * Should be implemented with server logic
 *
 * @param action {Object}
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.createAction=function(action,cb){
    throw new error.serverError('Action model method "createAction" is not implemented');
}

/**
 * update action object by primary key
 * Should be implemented with server logic
 *
 * @param action {Object}
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.updateAction=function(action,cb){
    throw new error.serverError('Action model method "updateAction" is not implemented');
}

/**
 * Delete action object by primary key
 * Should be implemented with server logic
 *
 * @param actionId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.deleteAction=function(actionId,cb){
    throw new error.serverError('Action model method "deleteAction" is not implemented');
}

/**
 * Delete action object in logic by primary key
 * Should be implemented with server logic
 *
 * @param actionId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.deleteActionInLogic=function(actionId,cb){
    throw new error.serverError('Action model method "deleteActionInLogic" is not implemented');
}

/**
 * Get all Actions object
 * Should be implemented with server logic
 *
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.getActions=function(cb){
    throw new error.serverError('Action model method "getActions" is not implemented');
}

/**
 * Gets primary key of the action
 *
 * @param action {Object} Action object
 */
module.exports.getId = function(action) {
    throw new error.serverError('Action model method "getId" is not implemented');
};

/**
 * Fetches action object by primary key
 * Should be implemented with server logic
 *
 * @param userId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.fetchById = function(actionId, cb) {
    throw new error.serverError('Action model method "fetchById" is not implemented');
};

/**
 * Fetches action object by primary key
 * Should be implemented with server logic
 *
 * @param actionname {String} Unique actionname/login
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.fetchByActioname = function(actionname, cb) {
    throw new error.serverError('User model method "fetchByActionname" is not implemented');
};
