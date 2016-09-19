
var RESULTMSG = {
    errcode         : 0,
    errmsg: '',
    data:{},
    extention:{}
};

module.exports.resultformat = (errcode,errmsg,data,extention) => {
	this.RESULTMSG = RESULTMSG;
	this.RESULTMSG.errcode = errcode;
	this.RESULTMSG.errmsg = errmsg;
	this.RESULTMSG.data = JSON.parse(data);
	this.RESULTMSG.extention = JSON.parse(extention);
	return RESULTMSG;
};