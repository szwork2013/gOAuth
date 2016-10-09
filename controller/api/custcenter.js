/**
@description 
用户中心接口模块
@module API
@submodule custcenter
@class custcenter
*/


/**
@description
	用户中心－登录			  </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	data参数名说明:            </br>
		username 用户名 </br>
		mobile 手机号 </br>
		roles 角色ID数组 </br>
		resources 资源ID数组 </br>
@method api/custcenter/login
@param username {String} 注册用户名，唯一
@param password {String} 密码
@param [code] {String} 验证码,根据安全需要时会要求提供
@return 返回架构中的 `data`说明
@example
	输入样例
	{
       "username":"admin",
       "password":"xxxxxxx",
       "code": "xxxx"
	}

	返回样例
	{
	   "id: "",
	   "user":{
		   "username": "",
		   "mobile": ""
		   "extention":{}
	   },
	   "roles":["abc","efg"],
	   "resources":["123","456"] 	
	}
*/
exports.postlogin = (req,res)  => {
	$.proxy_custmg.custcenter.login(req.body,(result) => {
		//create session
		// var id = req.session.id;
		// req.session.userSession = result.data;
  //       req.session.save(function(err) {
        	res.send(result);
        // });
	});
}

/**
@description
	用户中心－注册			 </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构: {RESULTMSG}      </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
						      </br>
	data参数名说明:            </br>
		username 用户名 </br>
		mobile 手机号 </br>
		roles 角色ID数组 </br>
		resources 资源ID数组 </br>
@method api/custcenter/register
@param username {String} 注册用户名，唯一
@param password {String} 密码
@param code {String} 验证码，必须
@return 返回架构中的 `data`说明
@example 
	输入参数
	   {
	        username:'admin',
	        password:'xxxxxxx',
	        code: 'xxxx'
	   }
*/
exports.postregister = (req,res) => {
    $.proxy_custmg.custcenter.register(req.body,(result)=>{
		res.send(result);
	});
}

/**		
/*用户中心－用户信息更新*/
exports.postprofileupdate = (req,res) => {
	$.proxy_custmg.custcenter.profileupdate(req.body,(result)=>{
		res.send(result);
	});
}

/*用户中心－忘记密码*/
exports.postforgetpassword = (req,res)  => {
	$.proxy_custmg.custcenter.forgetpassword(req.body,(result)=>{
		res.send(result);
	});
}

/*用户中心－密码修改*/
exports.postchangepassword = (req,res)  => {
	$.proxy_custmg.custcenter.changepassword(req.body,(result)=>{
		res.send(result);
	});
}

/*用户中心－获取验证码*/
exports.postcodegenerate = (req,res)  => {
	$.proxy_custmg.custcenter.codegenerate(req.body,(result)=>{
		res.send(result);
	});
}

/*用户中心－用户认证*/
exports.postverify = (req,res) => {
	$.proxy_custmg.custcenter.verify(req.body,(result)=>{
		res.send(result);
	});
}

exports.postlogout = (req,res) => {
	$.proxy_custmg.custcenter.logout(req.body,(result)=>{
		res.send(result);
	});
}

exports.postencrypt = (req,res) => {
	$.proxy_common.securitymg.encrypt(req.body,(result)=>{
		res.send(result);
	});
}

exports.postdecrypt = (req,res) => {
	$.proxy_common.securitymg.decrypt(req.body,(result)=>{
		res.send(result);
	});
}

