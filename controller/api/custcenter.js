var
async = $.async;

var userSession ={
	user:{
		userid:"userId",
		username:"userName",
		value:{
			resourceValue:6,
			actionsValue:256
		},
		userExtentions:{}
	},
	roles:[
	{
		roleId:"roleId",
		roleName:"admin"
	}
	],
	resource:[
	{
		resourceId:"resourceId",
		resourceName:"point.pointlist",
		value: 2,
		resource:"/point/pointlist.html"
	}
	],
	actions:[
	{
		actionId:"actionId",
		actionName:"point.getpoint",
		value: 32,
		action:"/point/pointlist"
	}
	]
};

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
exports.getregister = (req,res) => {
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


