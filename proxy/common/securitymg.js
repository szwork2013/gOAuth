var async = $.async;

exports.encrypt = (para, callback) =>
{
	$.plug.crypto.encrypt(para.msg, $.config.cryptsalt,(maskpw)=>{
		callback($.plug.resultformat(0, "",{msg:maskpw}));
	});
}

exports.decrypt = (para, callback) =>
{
	$.plug.crypto.decrypt(para.msg, $.config.cryptsalt,(pw)=>{
		callback($.plug.resultformat(0, "",{msg:pw}));
	});
}


/*生成scode*/
exports.generatecode = (para, callback) =>
{
	//根据类型保存各种code
	callback();
}

/*验证code有效性*/
exports.verifycode = (para, callback) =>
{
	callback();
}

/*是否需要强制验证*/
exports.iscodeforced = (para, callback) =>
{
	callback();
}

/*code短信发送*/
exports.smssend = (para, callback) =>
{
	callback();
}