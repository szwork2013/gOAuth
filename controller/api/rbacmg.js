/**
@description 
RBAC角色权限用户管理模块
@module API
@submodule rbacmg
@class rbacmg
*/

/*-----------------------角色管理接口-----------------------------------------------------------*/
/**
@description
	创建、修改角色		  </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
@method api/rbacmg/createrole
@param id {String} 角色ID，GUID，唯一验证
@param name {String} 角色名称，唯一验证
@param desc {String} 角色说明
@param isactive {String} 是否启用，0代表禁用，1代表启用
@return 参考返回结构
@example
	输入样例
	{
        "id":"3b7c2d81-aa23-4025-85a7-44c28a472718",
        "name":"admin",
        "desc":"后台管理员权限",
        "isactive":"1"
    }

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.postcreaterole = (req,res)  => {
	$.proxy_rbacmg.role.createrole(req.body, (result) => {
		res.send(result);
	});
}

/**
@description
	分页获取角色列表			 </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	`data` 参数名说明:            </br>
		id 角色ID，GUID </br>
		name 角色名称 </br>
		desc 角色说明 </br>
		isactive 是否启用，0代表禁用，1代表启用 </br>
@method api/rbacmg/allroles
@param from {Number} 列表起始位置，1代表第一条数据
@param size {Number} 返回条数，建议10
@return 返回架构中的 `data` 说明，`data` 是一个数组结构
@example
	输入样例
	/api/rbacmg/allroles?from=11&size=10

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.getallroles = (req,res)  => {
	$.proxy_rbacmg.role.allroles({from:req.query.from,size:req.query.size}, (result) => {
		res.send(result);
	});
}

/**
@description
	根据ID获取角色信息			 </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	`data` 参数名说明:            </br>
		id 角色ID，GUID </br>
		name 角色名称 </br>
		desc 角色说明 </br>
		isactive 是否启用，0代表禁用，1代表启用 </br>
@method api/rbacmg/rolebyid
@param id {String} 角色ID，GUID
@return 返回架构中的 `data`说明
@example
	输入样例
	/api/rbacmg/rolebyid?id=3b7c2d81-aa23-4025-85a7-44c28a472718

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.getrolebyid = (req,res)  => {
	$.proxy_rbacmg.role.rolebyid(req.query.id, (result) => {
		res.send(result);
	});
}

/*-----------------------资源管理接口-----------------------------------------------------------*/
/**
@description
	创建、修改资源			  </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
@method api/rbacmg/createresource
@param id {String} 资源ID，GUID，唯一验证
@param name {String} 资源名称，唯一验证
@param desc {String} 资源说明
@param action {String} 资源对应页面或者接口
@param type {String} 资源类型，有三种类型menu、action、others
@param parentid {String} 父资源ID，对于action、others会隶属于menu
@param isactive {String} 是否启用，0代表禁用，1代表启用
@return 参考返回结构
@example
	输入样例
	{
        "id":"0eaad0ac-3a5c-4382-8804-b093cc16287b",
        "name":"myshow",
        "desc":"我的展示",
        "action":"/show/exhibition-1.html",
        "type":"menu",
        "parentid":"",
        "value": "2",
        "isactive": "1"
    }

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.postcreateresource = (req,res)  => {
	$.proxy_rbacmg.resource.createresource(req.body, (result) => {
		res.send(result);
	});
}

/**
@description
	分页获取资源列表			 </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	`data` 参数名说明:            </br>
		id 资源ID，GUID
		name 资源名称
		desc 资源说明
		action 资源对应页面或者接口
		type 资源类型，有三种类型menu、action、others
		parentid 父资源ID，对于action、others会隶属于menu
		isactive 是否启用，0代表禁用，1代表启用
@method api/rbacmg/allresources
@param from {Number} 列表起始位置，1代表第一条数据
@param size {Number} 返回条数，建议10
@return 返回架构中的 `data` 说明，`data` 是一个数组结构
@example
	输入样例
	/api/rbacmg/allresources?from=11&size=10

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.getallresources = (req,res)  => {
	$.proxy_rbacmg.resource.allresources({from:req.query.from,size:req.query.size}, (result) => {
		res.send(result);
	});
}

/**
@description
	根据ID获取资源信息			 </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	`data` 参数名说明:            </br>
		id 资源ID，GUID       </br>
		name 资源名称         </br>
		desc 资源说明         </br>
		action 资源对应页面或者接口</br>
		type 资源类型，有三种类型menu、action、others</br>
		parentid 父资源ID，对于action、others会隶属于menu</br>
		isactive 是否启用，0代表禁用，1代表启用</br>
@method api/rbacmg/resourcebyid
@param id {String} 资源ID，GUID
@return 返回架构中的 `data`说明
@example
	输入样例
	/api/rbacmg/resourcebyid?id=3b7c2d81-aa23-4025-85a7-44c28a472718

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.getresourcebyid = (req,res)  => {
	$.proxy_rbacmg.resource.resourcebyid(req.query.id, (result) => {
		res.send(result);
	});
}

/*资源*/

/*-----------------------用户管理接口-----------------------------------------------------------*/
/**
@description
	创建、修改用户		  	  </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
@method api/rbacmg/createuser
@param id {String} 用户ID，GUID，唯一验证
@param name {String} 用户名称，唯一验证
@param mobile {String} 用户手机号，对于个人用户，name和mobile相同
@param password {String} 用户初始化密码
@param type {String} 用户类型，0代表企业，1代表个人
@param status {String} 用户状态，1代表激活，0代表未激活，2代表删除，3代表冻结等
@param [desc] {String} 资源说明
@return 参考返回结构
@example
	输入样例
	{
        "id:"ecb3a193-e53e-4910-8e02-0269931a7093",
        "name":'admin",
        "mobile":'13999999999",
        "password":"xxxxxxx",
        "type":"0",
        "desc":"后台管理员权限",
        "status":"1"
    }

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.postcreateuser = (req,res)  => {
	$.proxy_rbacmg.user.createuser(req.body, (result) => {
		res.send(result);
	});
}

/**
@description
	分页获取用户列表			 </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	`data` 参数名说明:            </br>
		id 用户ID，GUID，唯一验证</br>
		name 用户名称，唯一验证</br>
		mobile 用户手机号，对于个人用户，name和mobile相同</br>
		type 用户类型，0代表企业，1代表个人</br>
		status 用户状态，1代表激活，0代表未激活，2代表删除，3代表冻结等</br>
		desc  资源说明</br>
@method api/rbacmg/allusers
@param from {Number} 列表起始位置，1代表第一条数据
@param size {Number} 返回条数，建议10
@return 返回架构中的 `data` 说明，`data` 是一个数组结构
@example
	输入样例
	{
		"from":1,
		"size":10
	}
	/api/rbacmg/allusers?

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.postallusers = (req,res)  => {
	$.proxy_rbacmg.user.allusers(req.body, (result) => {
		res.send(result);
	});
}

/**
@description
	根据ID获取用户信息			 </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	`data` 参数名说明:            </br>
		id 用户ID，GUID，唯一验证</br>
		name 用户名称，唯一验证</br>
		mobile 用户手机号，对于个人用户，name和mobile相同</br>
		type 用户类型，0代表企业，1代表个人</br>
		status 用户状态，1代表激活，0代表未激活，2代表删除，3代表冻结等</br>
		desc  资源说明</br>
@method api/rbacmg/userbyid
@param id {String} 资源ID，GUID
@return 返回架构中的 `data`说明
@example
	输入样例
	/api/rbacmg/userbyid?id=3b7c2d81-aa23-4025-85a7-44c28a472718

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.getuserbyid = (req,res)  => {
	$.proxy_rbacmg.user.userbyid(req.query.id, (result) => {
		res.send(result);
	});
}

/*-----------------------角色权限管理接口-----------------------------------------------------------*/
/**
@description
	创建、修改角色和资源关系	  </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
@method api/rbacmg/createroleresources
@param id {String} 角色ID，GUID
@param resources {Array} 资源ID数组
@return 参考返回结构
@example
	输入样例
	{
        "id":"3b7c2d81-aa23-4025-85a7-44c28a472718",
        "resources":[
            "e6c58811-4620-4c6b-96d6-514797763236",
            "8a2f52be-9e45-4d0d-a2d4-a1394de9b7a9",
            "e6c58811-4620-4c6b-96d6-514797763236"
        ]
    }

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.postcreateroleresources = (req,res)  => {
	$.proxy_rbacmg.grants.createrole_resources(req.body, (result) => {
		res.send(result);
	});
}

/**
@description
	获取角色和资源关系	  </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
	`data` 参数名说明:            </br>
		id 角色ID，GUID，唯一验证</br>
@method api/rbacmg/roleresourcesbyroleid
@param id {String} 用户ID，GUID
@return 返回架构中的 `data`说明
@example
	输入样例
	api/rbacmg/roleresourcesbyroleid?id=3b7c2d81-aa23-4025-85a7-44c28a472718

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.getroleresourcesbyroleid = (req,res)  => {
	res.send("not implement");
}

/*-----------------------用户角色管理接口-----------------------------------------------------------*/
/**
@description
	创建、修改用户和角色关系	  </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
@method api/rbacmg/createuserroles
@param id {String} 用户ID，GUID
@param roles {Array} 权限ID数组
@return 参考返回结构
@example
	输入样例
	{
        "id":"3b7c2d81-aa23-4025-85a7-44c28a472718",
        "roles":[
            "e6c58811-4620-4c6b-96d6-514797763236",
            "8a2f52be-9e45-4d0d-a2d4-a1394de9b7a9",
            "e6c58811-4620-4c6b-96d6-514797763236"
        ]
    }

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.postcreateuserroles = (req,res)  => {
	$.proxy_rbacmg.grants.createuser_roles(req.body, (result) => {
		res.send(result);
	});
}

/**
@description
	获取用户和角色关系	  </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
	`data` 参数名说明:            </br>
		id 用户ID，GUID，唯一验证</br>
@method api/rbacmg/userrolesbyuserd
@param id {String} 用户ID，GUID
@return 返回架构中的 `data`说明
@example
	输入样例
	api/rbacmg/userrolesbyuserd?id=3b7c2d81-aa23-4025-85a7-44c28a472718

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.getuserrolesbyuserd = (req,res)  => {
	res.send("not implement");
}

/*-----------------------获取完整用户角色权限接口-----------------------------------------------------------*/
/**
@description
	获取完整用户角色权限数据	  </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
	`data` 参数名说明:            </br>
		id 用户ID</br>
		roles 角色ID数组</br>
		resources 资源ID数组</br>
@method api/rbacmg/usergrants
@param id {String} 用户ID，GUID
@return 返回架构中的 `data` 说明
@example
	输入样例
	/api/rbacmg/createuserroles?id=3b7c2d81-aa23-4025-85a7-44c28a472718
	
	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.getusergrants = (req,res)  => {
	$.proxy_rbacmg.grants.user_roles_resources(req.query.id, (result) => {
		res.send(result);
	});
}
