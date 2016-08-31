/* 商户登录 */
exports.checkShopLogin = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/ShopLogin",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("商户登录：checkShopLog/api/rewards/ShopLogin】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/*礼券列表*/
exports.getCouponPageList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetCouponPageList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("礼券列表：getCouponPageList【/api/Rewards/GetCouponPageList", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/*礼券信息*/
exports.getCoupon = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetCouponById?innerid=" + para.innerid,
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("礼券信息：getCoupon【/api/Rewards/GetCouponById", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/*礼券信息 by code*/
exports.getCouponByCode = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetCouponByCode?code=" + para.code,
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("礼券信息by code：getCouponByCode【/api/Rewards/GetCouponByCode", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/*核销礼券*/
exports.cancelCoupon = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/CancelCoupon",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("礼券核销：cancelCoupon【/api/Rewards/CancelCoupon", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/* 获取商户信息 */
exports.getShopById = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetShopById?innerid=" + para.shopid,
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取商户信息：getShopById【/api/Rewards/GetShopById", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/* 获取核销记录 */
exports.getVerificationRecord = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetCodeRecord",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("核销记录：getVerificationRecord【/api/Rewards/GetCodeRecord", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/* 获取核销汇总数据 */
exports.getVerificationRecordTotal = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetCodeRecordTotal",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("核销汇总数据：getVerificationRecordTotal【/api/Rewards/GetCodeRecordTotal", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/* 获取结算记录 */
exports.getSettLogPageList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetSettLogPageList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("结算记录：getSettLogPageList【/api/Rewards/GetSettLogPageList", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};