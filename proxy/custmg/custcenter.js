var async = $.async;

/*用户中心－开放登录*/
exports.login = (para, callback) => {
	var user,userSession;

	async.waterfall([
        //检察请求参数完整性
        function(cb) {
        	if (!para||!para.username||!para.password)
        		return cb($.plug.resultformat(30001,"Username and password is mandatory"));
        	cb();
        },
        //获取用户信息
        function(cb) {
        	user = {
        		id:"userId",
        		name:"userName",
        		value:{
        			resourceValue:6,
        			actionsValue:256
        		},
        		password:"1111",
        		extentions:{}
        	};
        	if(!user||user.name!=para.username) return cb($.plug.resultformat(30002,"User is not existed"));
        	cb();
        },
        //获取权限
        function(cb) {
        if(user.password!=para.password)return cb($.plug.resultformat(30003,"Either username or password is incorrect"));
        	userSession ={
        		user:{
        			id:'userId',
        			name:'userName',
        			value:{
        				resourceValue:6,
        				actionsValue:256
        			},
        			extentions:{}
        		},
        		roles:[
                   {
                    id:'roleId',
                    name:'admin'
            }
            ],
            resources:[
            {
                    id:'resourceId',
                    name:'point.pointlist',
                    value: 2,
                    resource:'/point/pointlist.html'
            }
            ],
            actions:[
            {
                    id:'actionId',
                    name:'point.getpoint',
                    value: 32,
                    action:'/point/pointlist'
            }
            ]
    };
    cb();
}
],
function(err) {
 if (err) 
 {
   callback(err); 
}else
{
    callback($.plug.resultformat(0,'',userSession)); 
}
});
}

/*用户中心－开放注册*/
exports.register = (para, callback) => {
	callback();
}

/*用户中心－用户信息更新*/
exports.profileupdate = (para, callback) => {
	callback();
}

/*用户中心－忘记密码*/
exports.forgetpassword = (para, callback) => {
	callback();
}

/*用户中心－密码修改*/
exports.changepassword = (para, callback) => {
	callback();
}

/*用户中心－获取验证码*/
exports.codegenerate = (para, callback) => {
	callback();
}

/*用户中心－用户认证*/
exports.verify = (para, callback) => {
	callback();
}

