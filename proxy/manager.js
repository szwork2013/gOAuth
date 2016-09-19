var rbac = require("../lib/rbacprovider")("redis");

/**
* 
**/
exports.fetchById = (para, callback) => {
	rbac.user.fetchById(para.id,callback);
};