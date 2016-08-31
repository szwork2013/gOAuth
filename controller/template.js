exports.getM_index = function(req, res) {
	var index = Number(req.params.index);
	if (!index || index <= 0 || index >= 6) {
		return res.send('页面不存在');
	}
	req.session = req.session ? req.session : {
		user: {
			Innerid: req.query.state
		}
	};
	// 获得openid
	$.proxy.wechat.getAccessTokenByCode(req, function(err, wechat) {
		// 
		$.proxy.api.getCarInfoById(req, function(err, data) {
			// 查看次数
			$.proxy.api.upSeeCount(req, function(err, data1) {
				// 获取会员信息
				$.proxy.api.getCustById($.setCookie(req, {
						state: req.query.state
				}), function(err, data4) {
					// 获取点赞信息
					$.proxy.api.getLaudatorListByCustid($.setCookie(req, {
						state: req.query.state
					}), function(err, data5) {
						// 获取访问量
						$.proxy.api.getCarShareInfo($.setCookie(req, {
							carid: req.query.carid
						}), function(err, data6) {
							// 是否已经点赞
							$.proxy.api.repeatPraise({
								custid: req.query.state,
								openid: wechat.openid,
								sessionID: req.sessionID,
								user: req.session.user
							}, function(err, data7) {
								// 打开模板
								res.render('template/' + index, {
									isDebug: $.config.debug,
									carData: data,
									custid: req.query.state,
									carid: req.query.carid,
									// 传appid
									appId: $.config.wx.appid,
									//
									url: "/open/release?id=" + req.query.carid,
									// 
									isshow: req.query.isshow,
									// 头像
									headportrait: data4.Headportrait ? (
										$.config.qnUrl + data4.Headportrait
									) : (
										data4.Wechat ? data4.Wechat.Photo : "/img/tx.png"
									),
									// 联系人
									name: data4.Custname,
									// 手机号
									mobile: data4.Mobile,
									// 点赞信息
									list: data5,
									// 访问量
									seeCount: data6.SeeCount,
									// 是否点赞
									isDz: data7,
									redirect_uri: $.config.redirect_uri
								});
							});
						});
					});
				});
			});
		});
	});
};

exports.getThumbUp_index = function(req, res) {
	req.session = req.session ? req.session : {
		user: {
			Innerid: req.query.state
		}
	};
	// 获得openid
	$.proxy.wechat.getAccessTokenByCode(req, function(err, data) {
		req.query.access_token = data.access_token;
		req.query.openid = data.openid;
		// 获取用户信息
		$.proxy.wechat.getUserinfoByOpenid(req, function(err, data1) {
			req.query.userinfo = data1;
			// 点赞
			$.proxy.api.custPraise(req, function(err, data2) {
				res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + $.config.wx.appid + '&redirect_uri=http://' + $.config.redirect_uri + '/template/m/' + req.params.index + "?carid=" + req.query.carid + "&response_type=code&scope=snsapi_userinfo&state=" + req.query.state + "#wechat_redirect");
			});
		});
	});
};