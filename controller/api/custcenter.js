var
async = $.async;

/*用户中心－开放登录*/
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

/*用户中心－开放注册*/
exports.postregister = (req,res) => {
    $.proxy_custmg.custcenter.register(req.body,(result)=>{
		res.send(result);
	});
}

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

