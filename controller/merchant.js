/*session 控制*/
function sessionControl(req, res) {
	var urlArr = req.url.split("/");
	var s = $.config.filter['max-age'];
	var loginUrl = '/merchant/login';
	if (req.session) {
		if (req.session.merchant) {
			req.session.cookie.expires = new Date(Date.now() + 1000 * s);
			req.session.cookie.maxAge = 1000 * s;
			req.session.save();
			return true;
		} else {
			res.redirect(loginUrl);
			return false;
		}
	} else {
		res.redirect(loginUrl);
		return false;
	}
}


/* 商城 merchant/shop */
exports.getShop = function(req, res) {
	$.proxy.merchant.getCouponPageList({
		sessionID: req.sessionID,
		"isenabled": 1,
	}, (err, data) => {
		$.extend(data, {
			qnurl: $.config.qnUrl,
			isDebug: $.config.debug,
		});
		res.render('merchant/shop', data);
	});
};


/* 登录页面 merchant/login */
exports.getLogin = function(req, res) {
	//已经登录了的
	var shopcode = '';
	if (req.session && req.session.merchant) {
		shopcode = req.session.merchant.Shopcode;
	}
	// 获取openid
	var openid = '';
	if (!req.query.code) {
		if (req.session) {
			openid = req.session.openid
		}
		res.render('merchant/login', {
			openid: openid,
			shopcode: shopcode,
			isDebug: $.config.debug,
		});
	} else {
		$.proxy.wechat.getAccessTokenByCode(req, function(err, data) {
			openid = data.openid;
			req.session.openid = openid;
			res.render('merchant/login', {
				openid: openid,
				shopcode: shopcode,
				isDebug: $.config.debug,
			});
		});
	}
};

/* 登录验证 merchant/checkLogin */
exports.postCheckLogin = function(req, res) {
	// 调用proxy文件夹api文件carEvaluateById方法
	$.proxy.merchant.checkShopLogin({
		sessionID: req.sessionID,
		Shopcode: req.body.username,
		Password: req.body.password
	}, (err, data) => {
		if (data && data.errcode == '0') {
			req.session.merchant = data.errmsg;
		}
		res.send(data);
	});
};


/* 输入核销号码 merchant/verficationSn */
exports.getVerificationSn = function(req, res) {
	if (!sessionControl(req, res)) return;
	res.render('merchant/verification-sn', {
		appId: $.config.wx.appid,
		isDebug: $.config.debug,
	});
};

/* 核对核销信息 merchant/verficationCheck */
exports.getVerificationCheck = function(req, res) {
	if (!sessionControl(req, res)) return;
	$.proxy.merchant.getCouponByCode({
		sessionID: req.sessionID,
		code: req.query.no
	}, (err, data) => {
		var result = {};
		var statusCode = 1;
		//礼券是否存在
		if (data && data.errcode == 0 && data.errmsg) {
			$.extend(result, data.errmsg);
			statusCode = result.IsEnabled || 0;
		} else {
			statusCode = 0;
			return res.redirect('/merchant/verificationSn?isEnabled=' + statusCode);
		}
		//非本店礼券
		if (req.session.merchant.Innerid != result.Shopid) {
			statusCode = 2;
		}
		result.Vstart = result.Vstart ? new Date(result.Vstart).format('yyyy-MM-dd') : '';
		result.Vend = result.Vend ? new Date(result.Vend).format('yyyy-MM-dd') : '';
		//已使用
		if (result.IsUsed == 1) {
			statusCode = 0;
		}
		//未到启用时间
		if (result.Vstart && new Date(result.Vstart) > new Date()) {
			statusCode = 0;
		}
		//已过期
		if (!result.Vend || new Date(result.Vend) < new Date()) {
			statusCode = 0;
		}
		$.extend(result, {
			appId: $.config.wx.appid,
			no: req.query.no,
		});
		if (statusCode != 1) {
			res.redirect('/merchant/verificationSn?isEnabled=' + statusCode);
		} else {
			$.proxy.merchant.getShopById({
				sessionID: req.sessionID,
				shopid: data.errmsg.Shopid
			}, function(err, shopData) {
				$.extend(result, {
					appId: $.config.wx.appid,
					no: req.query.no,
					Addr: {
						name: shopData.errmsg.Shopname,
						addr: (shopData.errmsg.Area || '') + (shopData.errmsg.Address || '')
					}
				});
				res.render('merchant/verification-check', {
					data: result,
					isDebug: $.config.debug,
				});
			});
		}
	});
};

/* 核销礼券 merchant/verficationResult */
exports.getVerificationResult = function(req, res) {
	if (!sessionControl(req, res)) return;
	$.proxy.merchant.cancelCoupon({
		sessionID: req.sessionID,
		Shopid: req.session.merchant.Innerid,
		Code: req.query.no,
	}, (err, data) => {
		var result = data;
		$.extend(result, {
			appId: $.config.wx.appid,
			isDebug: $.config.debug,
		})
		res.render('merchant/verification-result', result);
	});
};


/* 核销记录 merchant/verificationRecord */
exports.getVerificationRecord = function(req, res) {
	if (!sessionControl(req, res)) return;
	$.proxy.api.codeByTypeKey({
		typekey: 'coupon_type'
	}, (err, codeTable) => {
		res.render('merchant/verification-record', {
			coupon_type: codeTable.errmsg,
			isDebug: $.config.debug,
		});
	});
};

/* 核销记录 merchant/verificationRecordApi */
exports.getVerificationRecordApi = function(req, res) {
	if (!sessionControl(req, res)) return;
	var param = {
		"Shopid": req.session.merchant.Innerid,
		"Code": req.query.Code,
		"StartTime": req.query.StartTime,
		"EndTime": req.query.EndTime,
		"CardType": req.query.CardType,
		"PageSize": "20"
	};
	$.proxy.merchant.getVerificationRecord(
		param, (err, data) => {
			if (!data) {
				data = {
					"aaData": []
				}
			}
			$.proxy.merchant.getVerificationRecordTotal(
				param, (err, totalData) => {
					res.send($.extend(data, totalData.errmsg));
				}
			);
		}
	);
};

/* 核销详情 merchant/verificationRecordDetail */
exports.getVerificationRecordDetail = function(req, res) {
	if (!sessionControl(req, res)) return;
	$.proxy.merchant.getVerificationRecord({
		sessionID: req.sessionID,
		"Shopid": req.session.merchant.Innerid,
		"Code": req.query.code
	}, (err, data) => {
		if (!data || !data.aaData || !data.aaData.length) {
			data = {
				aaData: [{}]
			};
		}
		res.render("merchant/verification-record-detail", {
			data: data.aaData[0],
			isDebug: $.config.debug,
		});
	});
};

/* 结算记录 merchant/settLog */
exports.getSettLog = function(req, res) {
	if (!sessionControl(req, res)) return;
	res.render("merchant/settlement-record", {
		isDebug: $.config.debug,
	});
};
/* 结算记录 merchant/settLogApi */
exports.getSettLogApi = function(req, res) {
	if (!sessionControl(req, res)) return;
	$.proxy.merchant.getSettLogPageList({
		sessionID: req.sessionID,
		"Shopid": req.session.merchant.Innerid,
		"OrderidOrNumber": req.query.OrderidOrNumber,
		"PageSize": "20"
	}, (err, data) => {
		if (!data || !data.aaData || !data.aaData.length) {
			data = {
				aaData: []
			};
		}
		res.send(data);
	});
}

/* 结算详情 merchant/settlementDetail */
exports.getSettlementDetail = function(req, res) {
	if (!sessionControl(req, res)) return;
	$.proxy.merchant.getSettLogPageList({
		sessionID: req.sessionID,
		"OrderidOrNumber": req.query.OrderidOrNumber,
	}, (err, data) => {
		if (!data || !data.aaData || !data.aaData.length) {
			data = {
				aaData: [{}]
			};
		}
		data.aaData[0].Pictures = (data.aaData[0].Pictures || '').split(',');
		res.render("merchant/settlement-record-detail", {
			data: data.aaData[0],
			qnurl: $.config.qnUrl,
			isDebug: $.config.debug,
		});
	});
};