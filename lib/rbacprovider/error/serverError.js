var util = require('util'),
	rbac = require('./rbac.js');

var serverError = function (msg) {
    serverError.super_.call(this, 'server_error', msg, this.constructor);
};
util.inherits(serverError, rbac);
serverError.prototype.name = 'RBACServerError';
serverError.prototype.logLevel = 'error';

module.exports = serverError;