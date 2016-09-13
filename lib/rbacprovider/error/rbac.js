var
    util = require('util');
    
var rbac = function (code, msg, status, constructor) {
    Error.call(this);
    Error.captureStackTrace(this, constructor || this.constructor);

    this.code = code;
    this.message = msg;
    this.status = status;
};
util.inherits(rbac, Error);
rbac.prototype.name = 'RBACAbstractError';
rbac.prototype.logLevel = 'error';

module.exports = rbac;