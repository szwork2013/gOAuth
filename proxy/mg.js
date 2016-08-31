/***************
*** Management module***
***************/

/**
* Get User
***/
exports.getUserList = (para, callback) => {
	
	
};

/**
* 发送验证码
**/
exports.sendVerification = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Base/SendVerification",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("发送验证码：sendVerification【/api/Base/SendVerification】", para, data));
		callback(err,JSON.parse(data || '{}'));
	});
};