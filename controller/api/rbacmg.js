

// exports.postresourceinit = (req,res)  => {
// 	$.proxy_rbacmg.resourceinit(req.body, (result) => {
// 		res.send($.plug.resultformat(0,null,{id:result}));
// 	});
// }

// exports.postresourceinit = (req,res)  => {
// 	$.proxy_rbacmg.resourceinit(req.body, (result) => {
// 		res.send($.plug.resultformat(0,null,{id:result}));
// 	});
// }

/*-----------------------角色管理接口-----------------------------------------------------------*/
/*角色*/
exports.postcreaterole = (req,res)  => {
	$.proxy_rbacmg.role.createrole(req.body, (result) => {
		res.send(result);
	});
}

exports.getallroles = (req,res)  => {
	$.proxy_rbacmg.role.allroles({from:req.query.from,size:req.query.size}, (result) => {
		res.send(result);
	});
}

exports.getrolebyid = (req,res)  => {
	$.proxy_rbacmg.role.rolebyid(req.query.id, (result) => {
		res.send(result);
	});
}

/*角色*/

/*-----------------------资源管理接口-----------------------------------------------------------*/
/*资源*/
exports.postcreateresource = (req,res)  => {
	$.proxy_rbacmg.resource.createresource(req.body, (result) => {
		res.send(result);
	});
}

exports.getallresources = (req,res)  => {
	$.proxy_rbacmg.resource.allresources({from:req.query.from,size:req.query.size}, (result) => {
		res.send(result);
	});
}

exports.getresourcebyid = (req,res)  => {
	$.proxy_rbacmg.resource.resourcebyid(req.query.id, (result) => {
		res.send(result);
	});
}

/*资源*/

/*-----------------------用户管理接口-----------------------------------------------------------*/
/*用户*/
exports.postcreateuser = (req,res)  => {
	$.proxy_rbacmg.user.createuser(req.body, (result) => {
		res.send(result);
	});
}

exports.getallusers = (req,res)  => {
	$.proxy_rbacmg.user.allusers({from:req.query.from,size:req.query.size}, (result) => {
		res.send(result);
	});
}

exports.getuserbyid = (req,res)  => {
	$.proxy_rbacmg.user.userbyid(req.query.id, (result) => {
		res.send(result);
	});
}

/*用户*/


/*-----------------------角色权限管理接口-----------------------------------------------------------*/
exports.postcreateroleresources = (req,res)  => {
	$.proxy_rbacmg.grants.createrole_resources(req.body, (result) => {
		res.send(result);
	});
}



/*-----------------------用户角色管理接口-----------------------------------------------------------*/
exports.postcreateuserroles = (req,res)  => {
	$.proxy_rbacmg.grants.createuser_roles(req.body, (result) => {
		res.send(result);
	});
}


/*-----------------------获取完整用户角色权限接口-----------------------------------------------------------*/
exports.getusergrants = (req,res)  => {
	$.proxy_rbacmg.grants.user_roles_resources(req.query.id, (result) => {
		res.send(result);
	});
}



