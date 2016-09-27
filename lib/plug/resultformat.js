
var RESULTMSG = {
    errcode: 0,
    errmsg: '',
    data:{},
    extention:{}
};

module.exports = (errcode,errmsg,data,extention) => {
	this.RESULTMSG = RESULTMSG;
	this.RESULTMSG.errcode = errcode;
	this.RESULTMSG.errmsg = errmsg?errmsg:"";
	this.RESULTMSG.data = data?data:{};
	this.RESULTMSG.extention = extention?extention:{};
	return RESULTMSG;
};