/**
* 会员首页
*/
exports.getHome = (req, res) => {
	// 整合参数
	(function (para) {
		//调用proxy.api.custById
		$.proxy.api.custById(para, function(err, user) {
			// 获取点赞图组
			$.proxy.api.getLaudatorListByCustid($.setCookie(req, {
				state: para.custid
			}), function(err, dz) {
				// 更新缓存
				req.session.user = user;
				// 是否绑定openid
				var isopenid = false;
				if (user.Wechat) {
					if (user.Wechat.Openid) {
						isopenid = true;
					}
				}
				// 打开模板页
				res.render('common/layout', {
					// 页面名称
					title: "我的首页",
					// 需要打开的页面路径
					pagePath: '../page/home',
					// 头部路径
					headerPath: './layout_header',
					// 传appid
					appId: $.config.wx.appid,
					// 需要传递的页面内容
					pageJson: {
						userData: user,
						dzData: dz,
						isopenid: isopenid,
						appId: $.config.wx.appid,
						redirect_uri: $.config.redirect_uri,
						qnUrl: $.config.qnUrl
					}
				});
			});
		});
	})({
		// 传人参数
		sessionID: req.sessionID,
		user: req.session.user,
		custid: req.session.user.Innerid
	});
};

exports.getMenu = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "更多功能",
		// 需要打开的页面路径
		pagePath: '../page/menu',
		// 头部路径
		headerPath: './layout_header',
		// 传appid
		appId: $.config.wx.appid,
		// 加密地址
		redirect_uri: $.config.redirect_uri,
		// 需要传递的页面内容
		pageJson: {
		}
	});
};

exports.getAbout = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "关于我们",
		// 需要打开的页面路径
		pagePath: '../page/about',
		// 头部路径
		headerPath: './layout_header',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
		}
	});
};

exports.getAdvise = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "投诉建议",
		// 需要打开的页面路径
		pagePath: '../page/advise',
		// 头部路径
		headerPath: './layout_header',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
		}
	});
};

/**
* 车脉列表
*/
exports.getFriends = (req, res) => {
	// 调用proxy.api.getCustRelationsByUserId
	$.proxy.api.getCustRelationsByUserId({
		innerid: req.session.user.Innerid,
		id: req.sessionID,
		user: req.session.user
	}, function(err, data) {
		// 打开模板页
		res.render('common/layout', {
			// 页面名称
			title: "好友",
			// 需要打开的页面路径
			pagePath: '../page/friends',
			// 头部路径
			headerPath: './header/friends',
			// 传appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				data: (!data.errcode ? ((arr) => {
					for (var n in arr) {
						arr[n]["sort"] = $.plug.pinyin(arr[n]["Custname"] || "");
					}
					return arr.sort($.getSortFun('asc', "sort"));
				})(data.errmsg || {}) : []),
				qnurl: $.config.qnUrl
			}
		});
	});
};

/**
* 车辆信息
*/
exports.getCarsUpload = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "1. 车辆基本信息",
		// 需要打开的页面路径
		pagePath: '../page/carsupload',
		// 头部路径
		headerPath: './header/edit',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			btnTitle: "下一步",
			backUrl: "/open/cars"
		}
	});
};

/**
* 详细描述
*/
exports.getCarsEdit = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "2. 更多详情",
		// 需要打开的页面路径
		pagePath: '../page/carsedit',
		// 头部路径
		headerPath: './header/edit',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			btnTitle: "完成",
			backUrl: "/open/carsUpload"
		}
	});
};

/*
* 认证信息录入页
*/
exports.getCertification = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "认证信息录入",
		// 需要打开的页面路径
		pagePath: '../page/certification',
		// 头部路径
		headerPath: './header/edit',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			btnTitle: "完成",
			backUrl: "/open/cars"
		}
	});
};

exports.getRelease = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "车辆发布",
		// 需要打开的页面路径
		pagePath: '../page/release',
		// 头部路径
		headerPath: './header/edit',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			btnTitle: "预览",
			backUrl: "/open/cars",
			custid: req.session.user.Innerid,
			carid: req.query.id
		}
	});
};

/*---------------新-----------------*/
/*
* 个人信息录入页
*/
exports.getMember = (req, res) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/GetCustById?innerid=" + req.session.user.Innerid,
		type: "get",
		session: {
			id: req.sessionID,
			user: req.session.user
		}
	}, function(err, data) {
		data = JSON.parse(data).errmsg || {};
		data.qnurl = $.config.qnUrl;
		data.Brithday = new Date(data.Brithday).format("yyyy-MM-dd")
		// 打开模板页
		res.render('common/layout', {
			// 页面名称
			title: "个人信息录入",
			// 需要打开的页面路径
			pagePath: '../page/member',
			// 头部路径
			headerPath: './header/edit',
			// 传appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				btnTitle: "完成",
				backUrl: "/open/home",
				data: data
			}
		});
	});
};

/*
* 查看好友信息
* 请求：get
* 路由：/open/information
*/
exports.getInformation = (req, res) => {
	// 回调处理
	$.plug.promise((data, cb) => {
		// 获取会员列表
		$.proxy.api.getCarPageList({
			sessionID: req.sessionID,
			user: req.session.user,
			pageindex: "1",
			pagesize: "20",
			custid: req.query.innerid,
			status: 1,
			brand_id: req.query.brandid || "",
			series_id: req.query.seriesid || "",
			model_id: req.query.modelid || "",
			SearchField:  req.query.searchField || ""
		}, (err, data1) => {
			cb(data1);
		});
	})
	.then((data1, cb) => {
		// 获取会员信息
		$.proxy.api.getCustById({
			sessionID: req.sessionID,
			user: req.session.user,
			state: req.query.innerid
		}, function(err, data2) {
			cb({
				data1: data1,
				data2: data2
			});
		});
	})
	.end((err, data) => {
		// 打开模板页
		res.render('common/layout', {
			// 页面名称
			title: "好友信息",
			// 需要打开的页面路径
			pagePath: '../page/information',
			// 头部路径
			headerPath: './header/view',
			// 传appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				title: "好友信息",
				list: data.data1.aaData,
				backUrl: req.query.isqc != "true" ? "/open/friends" : "javascript:",
				qnurl: $.config.qnUrl,
				user: data.data2,
				qcsc: req.query.isqc
			}
		});
	});
};

exports.getValuation = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "精准估值",
		// 需要打开的页面路径
		pagePath: '../page/valuation',
		// 头部路径
		headerPath: './header/edit-nobtn',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			hasLogin: Boolean(req.query.login),
			btnTitle: "开始估值",
			backUrl: "/open/menu"
		}
	});
};

exports.getValuationResult = (req, res) => {
	var backUrl = "/open/valuation";
	if(Boolean(req.query.login)){
		backUrl += '?login=1';
	}
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "参考评估价",
		// 需要打开的页面路径
		pagePath: '../page/valuationResult',
		// 头部路径
		headerPath: './header/edit-nobtn',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			hasLogin: Boolean(req.query.login),
			btnTitle: "参考评估价",
			backUrl: backUrl
		}
	});
};

exports.getWait = (req, res) => {
	// 打开模板页
	res.render('common/layout', {
		// 页面名称
		title: "认证提醒",
		// 需要打开的页面路径
		pagePath: '../page/wait',
		// 头部路径
		headerPath: './header/edit-nobtn',
		// 传appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			hasLogin: true,
			backUrl: "/open/home"
		}
	});
};

/*******************0.8********************/

// 全城搜车
exports.getCarsearch = (req, res) => {
	// 分解年区间
	var year = (req.query.choose_year || "-").split("-"),
		interval = (req.query.choose_interval || "-").split("-");
	// 调用proxy文件夹api文件searchCarPageList接口
	$.proxy.api.searchCarPageList($.setCookie(req, {
		sessionID: req.sessionID,
		user: req.session.user,
		custid: req.session.user.Innerid,
		pageindex:"1",
		pagesize: 10,
		minyear: year[0],
		maxyear: year[1],
		minprice: interval[0],
		maxprice: interval[1],
		brand_id: req.query.choose_brand || "",
		series_id: req.query.choose_series || "",
		cityid: req.query.choose_city || "125"
	}), function(err, data) {
		// 获得城市接口
		$.proxy.api.getAllCity($.setCookie(req, {
			sessionID: req.sessionID,
			user: req.session.user
		}), function(err, citys) {
			// 打开模板页
			res.render('common/app/layout', {
				// 页面名称
				title: "全城搜车",
				// 需要打开的页面路径
				pagePath: '../../app/carsearch',
				// 是否显示菜单
				isShowMenu: false,
				// appid
				appId: $.config.wx.appid,
				// 需要传递的页面内容
				pageJson: {
					cars: data.aaData,
					qnUrl: $.config.qnUrl,
					isSs: !(!year[0] && !year[1] && !interval[0] && !interval[1] && !req.query.choose_brand && !req.query.choose_series),
					ishide: 'false',
					citys: citys
				}
			});
		});
	});
};

// 全城搜车
exports.getCarsearchAll = (req, res) => {
	// 造假
	req.session = req.session ? req.session : {
		user: {
			Innerid: ""
		}
	};
	// 分解年区间
	var year = (req.query.choose_year || "-").split("-"),
		interval = (req.query.choose_interval || "-").split("-");
	// 调用proxy文件夹api文件searchCarPageList接口
	$.proxy.api.searchCarPageList($.setCookie(req, {
		sessionID: req.sessionID,
		user: req.session.user,
		pageindex: "1",
		pagesize: 10,
		minyear: year[0],
		maxyear: year[1],
		minprice: interval[0],
		maxprice: interval[1],
		brand_id: req.query.choose_brand || "",
		series_id: req.query.choose_series || "",
		cityid: req.query.choose_city || "125"
	}), function(err, data) {
		// 获得城市接口
		$.proxy.api.getAllCity($.setCookie(req, {
			sessionID: req.sessionID,
			user: req.session.user
		}), function(err, citys) {
			// 打开模板页
			res.render('common/app/layout', {
				// 页面名称
				title: "全城搜车",
				// 需要打开的页面路径
				pagePath: '../../app/carsearch',
				// 是否显示菜单
				isShowMenu: false,
				// appid
				appId: $.config.wx.appid,
				// 需要传递的页面内容
				pageJson: {
					cars: data.aaData,
					qnUrl: $.config.qnUrl,
					isSs: !(!year[0] && !year[1] && !interval[0] && !interval[1] && !req.query.choose_brand && !req.query.choose_series),
					ishide: 'true',
					citys: citys
				}
			});
		});
	});
};

// 车辆详情
exports.getCardetail = (req, res) => {
	// 根据车辆id查看车辆
	$.plug.promise((data, cb) => {
		// 调用车辆详情接口
		$.proxy.api.carInfoById($.setCookie(req, {
			id: req.query.carid
		}), (err, car) => {
			cb({
				car: car.errmsg || {}
			});
		});
	})
	// 根据车辆id拉车辆图片
	.then((data, cb) => {
		// 调用车辆图片接口
		$.proxy.api.getCarPictureByCarid($.setCookie(req, {
			id: req.query.carid
		}), (err, imges) => {
			data["imges"] = imges.errmsg || {};
			cb(data);
		});
	})
	// 根据用户id拉个人信息
	.then((data, cb) => {
		// 调用proxy文件夹api文件custById接口
		$.proxy.api.custById($.setCookie(req, {
			custid: req.query.custid
		}), (err, cust) => {
			data["cust"] = cust;
			cb(data);
		});
	})
	// 渲染页面
	.end((err, data) => {
		// 打开模板页
		res.render('common/app/layout', {
			// 页面名称
			title: data.car.model_name,
			// 需要打开的页面路径
			pagePath: '../../app/cardetail',
			// 是否显示菜单
			isShowMenu: false,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				car: ((car, arrDate, arrIs) => {
					for(var key of arrDate) {
						car[key] = new Date(car[key]).format("yyyy-MM");
						$.parseNullDate(car, key);
					}
					for(var key of arrIs) {
						car[key] = car[key] ? "是" : "否";
					}
					car.imges = data.imges;
					car.qnUrl = $.config.qnUrl;
					car.redirect_uri = $.config.redirect_uri;
					return car;
				})(data.car, [
					"register_date",
					"buytime",
					"createdtime",
					"sold_time",
					"ckyear_date",
					"tlci_date",
					"audit_date"
				], [
					"isproblem",
					"istain"
				]),
				isfriend: req.query.isfriend,
				cust: data.cust,
				ishide: 'false',
				appId: $.config.wx.appid
			}
		});
	});
};

// 车辆详情
exports.getCardetailAll = (req, res) => {
	// 造假
	req.session = req.session ? req.session : {
		user: {
			Innerid: ""
		}
	};
	// 根据车辆id查看车辆
	$.plug.promise((data, cb) => {
		// 调用车辆详情接口
		$.proxy.api.carInfoById($.setCookie(req, {
			id: req.query.carid
		}), (err, car) => {
			cb({
				car: car.errmsg || {}
			});
		});
	})
	// 根据车辆id拉车辆图片
	.then((data, cb) => {
		// 调用车辆图片接口
		$.proxy.api.getCarPictureByCarid($.setCookie(req, {
			id: req.query.carid
		}), (err, imges) => {
			data["imges"] = imges.errmsg || {};
			cb(data);
		});
	})
	// 根据用户id拉个人信息
	.then((data, cb) => {
		// 调用proxy文件夹api文件custById接口
		$.proxy.api.custById($.setCookie(req, {
			custid: req.query.custid
		}), (err, cust) => {
			data["cust"] = cust;
			cb(data);
		});
	})
	// 渲染页面
	.end((err, data) => {
		// 打开模板页
		res.render('common/app/layout', {
			// 页面名称
			title: data.car.model_name,
			// 需要打开的页面路径
			pagePath: '../../app/cardetail',
			// 是否显示菜单
			isShowMenu: false,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				car: ((car, arrDate, arrIs) => {
					for(var key of arrDate) {
						car[key] = new Date(car[key]).format("yyyy-MM");
						$.parseNullDate(car, key);
					}
					for(var key of arrIs) {
						car[key] = car[key] ? "是" : "否";
					}
					car.imges = data.imges;
					car.qnUrl = $.config.qnUrl;
					car.redirect_uri = $.config.redirect_uri;
					return car;
				})(data.car, [
					"register_date",
					"buytime",
					"createdtime",
					"sold_time",
					"ckyear_date",
					"tlci_date",
					"audit_date"
				], [
					"isproblem",
					"istain"
				]),
				isfriend: req.query.isfriend,
				cust: data.cust,
				ishide: 'true'
			}
		});
	});
};

// 选择品牌
exports.getCarBrand = (req, res) => {
	// 获取品牌
	$.plug.promise((data, cb) => {
		// 是否获取品牌
		if (req.query.isbrand) {
			// 调用proxy文件夹api文件carBrand接口
			$.proxy.api.carBrand($.setCookie(req, {}), (err, brand) => {
				(obj => {
					// 调用proxy文件夹api文件carBrandHotTop接口
					$.proxy.api.carBrandHotTop($.setCookie(req, {}), (err, hot) => {
						// 品牌组装
						brand.errmsg = brand.errmsg || {};
						for (var o of brand.errmsg) {
							if (!obj[o['Initial']])
								obj[o['Initial']] = [];
							obj[o['Initial']].push(o);
						}
						cb({
							obj: obj,
							hot: hot,
							qnUrl: $.config.qnUrl,
							hidebx: true
						});
					});
				})({});
			});
		} else {
			cb({});
		}
	})
	// 获取车系
	.then((data, cb) => {
		// 是否获取车系
		if (req.query.isseries) {
			//调用proxy文件夹api文件carSeries接口
			$.proxy.api.carSeries($.setCookie(req, {
				brandId: req.query.id
			}), function(err, series){
				(obj => {
					series.errmsg = series.errmsg || {};
					for (var o of series.errmsg) {
						if (!obj[o['SeriesGroupName']])
							obj[o['SeriesGroupName']] = [];
						obj[o['SeriesGroupName']].push(o);
					}
					data["obj"] = obj;
					data["hidebx"] = false;
					cb(data);
				})({});
			});
		} else {
			cb(data);
		}
	})
	// 获取车型
	.then((data, cb) => {
		// 是否获取车系
		if (req.query.ismodel) {
			//调用proxy文件夹api文件carSeries接口
			$.proxy.api.carModel($.setCookie(req, {
				seriesId: req.query.id
			}), function(err, model){
				(obj => {
					model.errmsg = model.errmsg || {};
					for (var o of model.errmsg) {
						if (!obj[o['Modelyear']])
							obj[o['Modelyear']] = [];
						obj[o['Modelyear']].push(o);
					}
					data["obj"] = obj;
					data["hidebx"] = false;
					cb(data);
				})({});
			});
		} else {
			cb(data);
		}
	})
	// 渲染页面
	.end((err, data) => {
		// 打开模板页
		res.render('common/app/layout', {
			// 页面名称
			title: "品牌车型",
			// 需要打开的页面路径
			pagePath: '../../app/carbrand',
			// 是否显示菜单
			isShowMenu: false,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				title: req.query.isbrand == 'true' ? '品牌' : (req.query.isseries == 'true' ? '车系' : '车型'),
				brand: req.query.isbrand,
				series: req.query.isseries,
				model: req.query.ismodel,
				data: data,
				colname: req.query.isbrand == 'true' ? 'BrandName' : (req.query.isseries == 'true' ? 'SeriesName' : 'Modelname'),
				type: req.query.type,
				ishide: 'false'
			}
		});
	});
};

// 选择品牌
exports.getCarBrandAll = (req, res) => {
	// 造假
	req.session = req.session ? req.session : {
		user: {
			Innerid: ""
		}
	};
	// 获取品牌
	$.plug.promise((data, cb) => {
		// 是否获取品牌
		if (req.query.isbrand) {
			// 调用proxy文件夹api文件carBrand接口
			$.proxy.api.carBrand($.setCookie(req, {}), (err, brand) => {
				(obj => {
					// 调用proxy文件夹api文件carBrandHotTop接口
					$.proxy.api.carBrandHotTop($.setCookie(req, {}), (err, hot) => {
						// 品牌组装
						brand.errmsg = brand.errmsg || {};
						for (var o of brand.errmsg) {
							if (!obj[o['Initial']])
								obj[o['Initial']] = [];
							obj[o['Initial']].push(o);
						}
						cb({
							obj: obj,
							hot: hot,
							qnUrl: $.config.qnUrl,
							hidebx: true
						});
					});
				})({});
			});
		} else {
			cb({});
		}
	})
	// 获取车系
	.then((data, cb) => {
		// 是否获取车系
		if (req.query.isseries) {
			//调用proxy文件夹api文件carSeries接口
			$.proxy.api.carSeries($.setCookie(req, {
				brandId: req.query.id
			}), function(err, series){
				(obj => {
					series.errmsg = series.errmsg || {};
					for (var o of series.errmsg) {
						if (!obj[o['SeriesGroupName']])
							obj[o['SeriesGroupName']] = [];
						obj[o['SeriesGroupName']].push(o);
					}
					data["obj"] = obj;
					data["hidebx"] = false;
					cb(data);
				})({});
			});
		} else {
			cb(data);
		}
	})
	// 获取车型
	.then((data, cb) => {
		// 是否获取车系
		if (req.query.ismodel) {
			//调用proxy文件夹api文件carSeries接口
			$.proxy.api.carModel($.setCookie(req, {
				seriesId: req.query.id
			}), function(err, model){
				(obj => {
					model.errmsg = model.errmsg || {};
					for (var o of model.errmsg) {
						if (!obj[o['Modelyear']])
							obj[o['Modelyear']] = [];
						obj[o['Modelyear']].push(o);
					}
					data["obj"] = obj;
					data["hidebx"] = false;
					cb(data);
				})({});
			});
		} else {
			cb(data);
		}
	})
	// 渲染页面
	.end((err, data) => {
		// 打开模板页
		res.render('common/app/layout', {
			// 页面名称
			title: "品牌车型",
			// 需要打开的页面路径
			pagePath: '../../app/carbrand',
			// 是否显示菜单
			isShowMenu: false,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				title: req.query.isbrand == 'true' ? '品牌' : (req.query.isseries == 'true' ? '车系' : '车型'),
				brand: req.query.isbrand,
				series: req.query.isseries,
				model: req.query.ismodel,
				data: data,
				colname: req.query.isbrand == 'true' ? 'BrandName' : (req.query.isseries == 'true' ? 'SeriesName' : 'Modelname'),
				type: req.query.type,
				ishide: 'true'
			}
		});
	});
};

// 车辆管理
exports.getCars = (req, res) => {
	// 第一步 查询车辆
	$.plug.promise((data, cb) => {
		console.log({
			pageindex: req.query.pageindex || "1",
			pagesize: "999",
			custid: req.session.user.Innerid,
			status: 1,
			brand_id: req.query.brandid ? req.query.brandid.replace("-", "") : "",
			series_id: "",
			model_id: "",
			SearchField:  req.query.searchField || ""
		});
		// 车辆列表
		$.proxy.api.getCarPageList($.setCookie(req, {
			pageindex: req.query.pageindex || "1",
			pagesize: "999",
			custid: req.session.user.Innerid,
			status: 1,
			brand_id: req.query.brandid ? req.query.brandid.replace("-", "") : "",
			series_id: "",
			model_id: "",
			SearchField:  req.query.searchField || ""
		}), (err, data) => {
			cb(data);
		});
	})
	// 第二步 渲染页面
	.end((err, data) => {
		console.log(data);
		// 打开模板页
		res.render('common/app/layout', {
			// 页面名称
			title: "车辆管理",
			// 需要打开的页面路径
			pagePath: '../../app/carmanage',
			// 是否显示菜单
			isShowMenu: true,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				list: data.aaData,
				qnurl: $.config.qnUrl,
				custid: req.session.user.Innerid,
				mobile: req.session.user.Mobile,
				status: 1
			}
		});
	});
};

// 车辆管理
exports.getSoldCars = (req, res) => {
	// 第一步 查询车辆
	$.plug.promise((data, cb) => {
		// 车辆列表
		$.proxy.api.getCarPageList($.setCookie(req, {
			pageindex: req.query.pageindex || "1",
			pagesize: "999",
			custid: req.session.user.Innerid,
			status: 2,
			brand_id: req.query.brandid ? req.query.brandid.replace("-", "") : "",
			series_id: "",
			model_id: "",
			SearchField:  req.query.searchField || ""
		}), (err, data) => {
			cb(data);
		});
	})
	// 第二步 渲染页面
	.end((err, data) => {
		// 打开模板页
		res.render('common/app/layout', {
			// 页面名称
			title: "车辆管理",
			// 需要打开的页面路径
			pagePath: '../../app/carmanage',
			// 是否显示菜单
			isShowMenu: true,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				list: data.aaData,
				qnurl: $.config.qnUrl,
				custid: req.session.user.Innerid,
				mobile: req.session.user.Mobile,
				status: 2
			}
		});
	});
};

// 礼券列表
exports.getCoupon = (req, res) => {
	// 第一步 礼劵
	$.plug.promise((data, cb) => {
		// proxy文件夹api文件myCodeList方法
		$.proxy.api.myCodeList($.setCookie(req, {
			Custid: req.session.user.Innerid,
			Status: req.query.status || 1,
			Shopid: req.query.shopid || "",
			PageIndex: 1,  //默认1
			PageSize: 50,  //默认10
			IsExpire: req.query.IsExpire || 0,
			cardtype: req.query.cardtype || ""
		}), (err, data) => {
			cb(data);
		});
	})
	// 第二步 读卡劵类型列表
	.then((data, cb) => {
		// proxy文件夹api文件codeByTypeKey方法
		$.proxy.api.codeByTypeKey($.setCookie(req, {
			typekey: 'coupon_type'
		}), (err, cardtype) => {
			cardtype.errmsg = cardtype.errmsg || {};
			cardtype.errmsg.unshift({
				CodeName: "不限",
				CodeValue: ""
			});
			data["cardtype"] = cardtype.errmsg;
			cb(data);
		});
	})
	// 第三步 渲染
	.end((err, data) => {
		// 打开礼劵列表页面
		res.render('common/app/layout', {
			// 页面名称
			title: "我的劵",
			// 需要打开的页面路径
			pagePath: '../../app/custcoupon',
			// 是否显示菜单
			isShowMenu: false,
			// appid
			appId: $.config.wx.appid,
			// 加密地址
			redirect_uri: $.config.redirect_uri,
			// 需要传递的页面内容
			pageJson: {
				list: data.aaData,
				status: req.query.status || 1,
				qnUrl: $.config.qnUrl,
				iTotalDisplayRecords: req.query.status != 1 ? data.iTotalDisplayRecords : data.iTotalRecords,
				cardtype: data.cardtype
			}
		});
	});
};

// 礼券详情
exports.getCouponDetail = (req, res) => {
	$.proxy.api.couponDetail($.setCookie(req, {
		code: req.query.code
	}), (err, data) => {
		// 打开礼劵列表页面
		res.render('common/app/layout', {
			// 页面名称
			title: "礼劵详情",
			// 需要打开的页面路径
			pagePath: '../../app/coupondetail',
			// 是否显示菜单
			isShowMenu: false,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
				detail: data.errmsg || {},
				qnUrl: $.config.qnUrl
			}
		});
	});
};

// 商品或门店购买列表
exports.getMallCouponPageList = (req, res) => {
	// 第一步 门店购买列表
	req.query.type = (req.query.type || 1);
	$.plug.promise((data, cb) => {
		// 是门店还是商品
		if (req.query.type == 1) {
			// proxy文件夹api文件mallShopPageList方法
			$.proxy.api.mallCouponPageList($.setCookie(req, {
				Shopid: req.query.shopid || "",
				Title: req.query.title || "",
				CardTypes: req.query.cardTypes || "",
				PageIndex: "1",
				PageSize: "10"
			}), (err, data) => {
				cb(data);
			});
		} else {
			// proxy文件夹api文件mallShopPageList
			$.proxy.api.mallShopPageList($.setCookie(req, {
				CardTypes: "",
				Shopname: "",
				PageIndex: "1", //分页页码
				PageSize: "10" //分页大小
			}), (err, data) => {
				cb(data);
			});
		}
	})
	// 第二步 读卡劵类型列表
	.then((data, cb) => {
		// proxy文件夹api文件codeByTypeKey方法
		$.proxy.api.codeByTypeKey($.setCookie(req, {
			typekey: 'coupon_type'
		}), (err, cardtype) => {
			// 是门店还是商品
			if (req.query.type == 1) {
				cardtype.errmsg = cardtype.errmsg || {};
				cardtype.errmsg.unshift({
					CodeName: "全部",
					CodeValue: ""
				});
			}
			data["cardtype"] = cardtype.errmsg
			cb(data);
		});
	})
	// 第三步 渲染商城页面
	.end((err, data) => {
		// 获得城市接口
		$.proxy.api.getAllCity($.setCookie(req, {
			sessionID: req.sessionID,
			user: req.session.user
		}), function(err, citys) {
			// 打开礼劵列表页面
			res.render('common/app/layout', {
				// 页面名称
				title: "商城",
				// 需要打开的页面路径
				pagePath: req.query.type == 1 ? '../../app/couponshop' : '../../app/couponshop',
				// 是否显示菜单
				isShowMenu: false,
				// appid
				appId: $.config.wx.appid,
				// 需要传递的页面内容
				pageJson: {
					list: data.aaData,
					qnUrl: $.config.qnUrl,
					type: req.query.type,
					cardtype: data.cardtype,
					citys: citys
				}
			});
		});
	});
};

// 门店详情页
exports.getShopViewById = (req, res) => {
	// 第一步 门店id查详情
	$.plug.promise((data, cb) => {
		// proxy文件夹api文件shopViewById
		$.proxy.api.shopViewById($.setCookie(req, {
			id: req.query.id || ""
		}), (err, data) => {
			cb(data);
		});
	})
	// 第二步 获取店铺列表
	.then((data, cb) => {
		// proxy文件夹api文件mallShopPageList方法
		$.proxy.api.mallCouponPageList($.setCookie(req, {
			Shopid: req.query.id || "",
			PageIndex: "1",
			PageSize: "50"
		}), (err, ljs) => {
			cb({
				detail: data.errmsg || {},
				list: ljs.aaData,
				qnUrl: $.config.qnUrl
			});
		});
	})
	// 渲染商城详情页面
	.end((err, data) => {
		// 打开礼劵列表页面
		res.render('common/app/layout', {
			// 页面名称
			title: data.Shopname || "",
			// 需要打开的页面路径
			pagePath: '../../app/shopdetail',
			// 是否显示菜单
			isShowMenu: false,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: data
		});
	});
};

// 拍卖
exports.getAuction = (req, res) => {
	// 打开礼劵列表页面
	res.render('common/app/layout', {
		// 页面名称
		title: "设置拍卖",
		// 需要打开的页面路径
		pagePath: '../../app/auction',
		// 是否显示菜单
		isShowMenu: false,
		// appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			
		}
	});
};

// 登录
exports.getLogin = (req, res) => {
	// 是否存在code
	if (req.query.code) {
		// proxy文件夹wechat文件getAccessTokenByCode方法
		$.proxy.wechat.getAccessTokenByCode(req, function(err, wechat) {
			// 是否成功获取openid
			if (wechat.openid) {
				// 缓存openid
				req.session.openid = wechat.openid;
				// 创建缓存操作对象
				var redis = new $.plug.redis();
				// 获取缓存
				redis.rGets([
					(req.session.openid || "") + "_mobile",
					(req.session.openid || "") + "_password"
				], function(err, login) {
					// 缓存用户名密码是否存在
					if (login.join() != ",") {
						// proxy文件夹api文件login方法
						$.proxy.api.login($.setCookie(req, {
							password: login[1] || '', // 密码	
							mobile: login[0] || '' // 手机号
						}), function(err, data) {
							// 结果是否合法
							if (data && !data.Message && !data.errcode) {
								redis.end();
								req.session.user = data.errmsg || {};
								res.redirect('/open/home?iszd=true');
							} else {
								// 打开登录页面
								res.render('common/app/layout', {
									// 页面名称
									title: "登录",
									// 需要打开的页面路径
									pagePath: '../../app/login',
									// 是否显示菜单
									isShowMenu: false,
									// appid
									appId: $.config.wx.appid,
									// 需要传递的页面内容
									pageJson: {
										
									}
								});
							}
						});
					} else {
						// 打开登录页面
						res.render('common/app/layout', {
							// 页面名称
							title: "登录",
							// 需要打开的页面路径
							pagePath: '../../app/login',
							// 是否显示菜单
							isShowMenu: false,
							// appid
							appId: $.config.wx.appid,
							// 需要传递的页面内容
							pageJson: {
								
							}
						});
					}
				});
			} else {
				// 打开登录页面
				res.render('common/app/layout', {
					// 页面名称
					title: "登录",
					// 需要打开的页面路径
					pagePath: '../../app/login',
					// 是否显示菜单
					isShowMenu: false,
					// appid
					appId: $.config.wx.appid,
					// 需要传递的页面内容
					pageJson: {
						
					}
				});
			}
		});
	} else {
		// 打开登录页面
		res.render('common/app/layout', {
			// 页面名称
			title: "登录",
			// 需要打开的页面路径
			pagePath: '../../app/login',
			// 是否显示菜单
			isShowMenu: false,
			// appid
			appId: $.config.wx.appid,
			// 需要传递的页面内容
			pageJson: {
			}
		});
	}
};

// 注册
exports.getRegister = (req, res) => {
	// 打开礼劵列表页面
	res.render('common/app/layout', {
		// 页面名称
		title: "注册",
		// 需要打开的页面路径
		pagePath: '../../app/register',
		// 是否显示菜单
		isShowMenu: false,
		// appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			
		}
	});
};

// 重置
exports.getRecover = (req, res) => {
	// 打开礼劵列表页面
	res.render('common/app/layout', {
		// 页面名称
		title: "密码重置",
		// 需要打开的页面路径
		pagePath: '../../app/recover',
		// 是否显示菜单
		isShowMenu: false,
		// appid
		appId: $.config.wx.appid,
		// 需要传递的页面内容
		pageJson: {
			
		}
	});
};