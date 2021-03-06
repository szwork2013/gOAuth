var
    error = require('./../error');

/**
 * User schema is defined by server side logic
 */

/**
 * Create user object by primary key
 * Should be implemented with server logic
 *
 * @param user {Object}
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.createUser=function(user,cb){
    throw new error.serverError('User model method "createUser" is not implemented');
}

/**
 * update user object by primary key
 * Should be implemented with server logic
 *
 * @param user {Object}
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.updateUser=function(user,cb){
    throw new error.serverError('User model method "updateUser" is not implemented');
}

/**
 * Delete user object by primary key
 * Should be implemented with server logic
 *
 * @param userId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.deleteUser=function(userId,cb){
    throw new error.serverError('User model method "deleteUser" is not implemented');
}

/**
 * Delete user object in logic by primary key
 * Should be implemented with server logic
 *
 * @param userId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.deleteUserInLogic=function(userId,cb){
    throw new error.serverError('User model method "deleteUserInLogic" is not implemented');
}

/**
 * Get all users object
 * Should be implemented with server logic
 *
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.getUsers=function(cb){
    throw new error.serverError('User model method "getUsers" is not implemented');
}

/**
 * Gets primary key of the user
 *
 * @param user {Object} User object
 */
module.exports.getId = function(user) {
    throw new error.serverError('User model method "getId" is not implemented');
};

/**
 * Fetches user object by primary key
 * Should be implemented with server logic
 *
 * @param userId {String} Unique identifier
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.fetchById = function(userId, cb) {
    throw new error.serverError('User model method "fetchById" is not implemented');
};

/**
 * Fetches user object by primary key
 * Should be implemented with server logic
 *
 * @param username {String} Unique username/login
 * @param cb {Function} Function callback ->(error, object)
 */
module.exports.fetchByUsername = function(username, cb) {
    throw new error.serverError('User model method "fetchByUsername" is not implemented');
};

/**
 * Checks password for the user
 * Function arguments MAY be different
 *
 * @param user {Object} User object
 * @param password {String} Password to be checked
 * @param cb {Function} Function callback -> (error, boolean) If input is correct
 */
module.exports.checkPassword = function(user, password, cb) {
    /**
     * In case of sync check function use:
     * (user.password == superHashFunction(password)) ? cb(null, true) : cb(null, false);
     */
    throw new error.serverError('User model method "checkPassword" is not implemented');
};