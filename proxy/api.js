/***************
*** 车辆相关 ***
***************/

/**
* 车辆列表
***/
exports.getCarPageList = (para, callback) => {
	// 车辆列表
	$.ajax({
		url: $.config.htUrl + "/api/Car/GetCarPageList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("车辆列表：getCarPageList【/api/Car/GetCarPageList】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 车辆查看
***/
exports.carInfoById = (para, callback) => {
	// 车辆查看
	$.ajax({
		url: $.config.htUrl + "/api/Car/GetCarInfoById?id={0}".format(para.id),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("车辆查看：carInfoById【/api/Car/GetCarInfoById?id=id】", para, data));
		callback(err,JSON.parse(data || '{}'));
	});
};

/**
* 获取车辆图片
***/
exports.getCarPictureByCarid = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/GetCarPictureByCarid?Carid={0}".format(para.id),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取车辆图片：getCarPictureByCarid【/api/Car/GetCarPictureByCarid?Carid=id】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获取品牌
***/
exports.carBrand = (para, callback) => {
	// 获取品牌
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetCarBrand",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取品牌：carBrand【/api/Base/GetCarBrand】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获取车系
***/
exports.carSeries = (para, callback) => {
	// 获取车系
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetCarSeries?brandId={0}".format(para.brandId),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取车系：carSeries【/api/Base/GetCarSeries?brandId=brandId】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获取车型
***/
exports.carModel = (para, callback) => {
	// 获取车型
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetCarModel?seriesId={0}".format(para.seriesId),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取车型：carModel【/api/Base/GetCarModel?seriesId=seriesId】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 车辆保存
***/
exports.saveCar = (para, callback) => {
	// 车辆保存
	$.ajax({
		url: $.config.htUrl + (para.innerid ? "/api/Car/UpdateCar" : "/api/Car/AddCar"),
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("车辆保存：saveCar【/api/Car/UpdateCar || /api/Car/AddCar】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 批量添加并删除车辆图片(添加)(微信端使用)
**/
exports.saveCarPicture = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/SaveCarPicture",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("批量添加并删除车辆图片(添加)(微信端使用)：saveCarPicture【/api/Car/SaveCarPicture】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 车辆成交
**/
exports.dealCar = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/DealCar",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("车辆成交：dealCar【/api/Car/DealCar】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 车辆删除
**/
exports.deleteCar = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/DeleteCar",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("车辆删除：deleteCar【/api/Car/DeleteCar】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/***************
*** 好友相关 ***
***************/

/**
* 好友列表
***/
exports.getCustRelationsByUserId = (para, callback) => {
	// 好友列表
	$.ajax({
		url: $.config.htUrl + "/api/CustRelations/GetCustRelationsByUserId?userid={0}".format(para.innerid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("好友列表：getCustRelationsByUserId【/api/CustRelations/GetCustRelationsByUserId?userid=innerid】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/***************
*** 用户相关 ***
***************/

/**
* 验证手机号
***/
exports.checkByMobile = (para, callback) => {
	// 验证手机号
	$.ajax({
		url: $.config.htUrl + "/api/Customer/CheckMobile?mobile={0}".format(para.mobile),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: {
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("验证手机号：checkByMobile【/api/Customer/CheckMobile?mobile=mobile】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 用户注册
***/
exports.register = (para, callback) => {
	// 注册用户
	$.ajax({
		url: $.config.htUrl + "/api/Customer/CustRegister",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("用户注册：register【/api/Customer/CustRegister】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*更新密码
**/
exports.updatePassword = (para, callback) => {
	// 密码找回
	$.ajax({
		url: $.config.htUrl + "/api/Customer/UpdatePassword",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("更新密码：updatePassword【/api/Customer/UpdatePassword】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 用户登录
***/
exports.login = (para, callback) => {
	// 用户登录
	$.ajax({
		url: $.config.htUrl + "/api/Customer/CustLogin",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("用户登录：login【/api/Customer/CustLogin】", para, data));
		// 执行回调
		callback(err, JSON.parse(data || '{}'));
	});
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

/**
* 获取会员信息
**/
exports.custById = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/GetCustById?innerid=" + para.custid,
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取会员信息：custById【/api/Customer/GetCustById?innerid=innerid】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg); 
	});
};

/**
* 搜索会员列表
**/
exports.custPageList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/CustRelations/GetCustPageList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("搜索会员列表：custPageList【/api/CustRelations/GetCustPageList】", para, data));
		callback(err,JSON.parse(data || '{}'));
	});
};

/**
* 认证信息录入
*/
exports.certification = (para, callback) => {
	para.custid = para.user.Innerid;
	$.ajax({
		url: $.config.htUrl + "/api/Customer/AddAuthentication",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("认证信息录入：certification【/api/Customer/AddAuthentication】", para, data));
		callback(err,JSON.parse(data || '{}'));
	});
};

/***************
*** 发布相关 ***
***************/

/***************
*** 其它相关 ***
***************/

/**
* 获取省份
***/
exports.provList = (para, callback) => {
	// 获取省份
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetProvList",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取省份：provList【/api/Base/GetProvList】", para, data));
		// 回调
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获取城市
***/
exports.cityList = (para, callback) => {
	// 获取城市
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetCityList?provid={0}".format(para.provid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取城市：cityList【/api/Base/GetCityList?provid=provid】", para, data));
		// 回调
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获取code
***/
exports.codeByTypeKey = (para, callback) => {
	// 获取code
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetCodeByTypeKey?typekey={0}".format(para.typekey),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取code：codeByTypeKey【/api/Base/GetCodeByTypeKey?typekey=typekey】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 分享统计
*/
exports.shareTotal = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/ShareCar?id={0}".format(para.id),
		type: "get",
		session: {
			id: para.sessionid,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("分享统计：shareTotal【/api/Car/ShareCar?id=id】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获取不同年龄段买家分布
**/
exports.ageArea = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetAgeArea",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取不同年龄段买家分布：ageArea【/api/DataAnalysis/GetAgeArea】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*获取买家性别比例
**/
exports.genterPer = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetGenterPer",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取买家性别比例：genterPer【/api/DataAnalysis/GetGenterPer】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 年度市场交易走势
**/
exports.tradeLineByYear = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetTradeLineByYear",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("年度市场交易走势：tradeLineByYear【/api/DataAnalysis/GetTradeLineByYear】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
}

/**
* 二手车使用年限分析
**/
exports.usedCarYearAnalysis = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetUsedCarYearAnalysis",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("二手车使用年限分析：usedCarYearAnalysis【/api/DataAnalysis/GetUsedCarYearAnalysis】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*可接受的二手车行驶里程
**/
exports.usedCarAccept = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetUsedCarAccept",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("可接受的二手车行驶里程：usedCarAccept【/api/DataAnalysis/GetUsedCarAccept】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*3-5万公里满意度
**/
exports.satisfaction3To5 = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetSatisfaction3To5",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("3-5万公里满意度：satisfaction3To5【/api/DataAnalysis/GetSatisfaction3To5】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*3-5万公里不满意度
**/
exports.unSatisfaction3To5 = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetUnSatisfaction3To5",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("3-5万公里不满意度：unSatisfaction3To5【/api/DataAnalysis/GetUnSatisfaction3To5】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*1-3万公里满意度
**/
exports.satisfaction1To3 = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetSatisfaction1To3",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("1-3万公里满意度：satisfaction1To3【/api/DataAnalysis/GetSatisfaction1To3】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 1-3万公里不满意度
**/
exports.unSatisfaction1To3 = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetUnSatisfaction1To3",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("1-3万公里不满意度：unSatisfaction1To3【/api/DataAnalysis/GetUnSatisfaction1To3】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 月度品牌热搜前10
**/
exports.hotBrandTop10 = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetHotBrandTop10",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("月度品牌热搜前10：hotBrandTop10【/api/DataAnalysis/GetHotBrandTop10】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*二手车交易量全国占比排行前10省份
**/
exports.usedCarTradeTop10 = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetUsedCarTradeTop10",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("二手车交易量全国占比排行前10省份：usedCarTradeTop10【/api/DataAnalysis/GetUsedCarTradeTop10】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*二手车交易量全国占比排行倒数8省份
**/
exports.usedCarTradeLaset8 = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetUsedCarTradeLaset8",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("二手车交易量全国占比排行倒数8省份：usedCarTradeLaset8【/api/DataAnalysis/GetUsedCarTradeLaset8】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*二手车近几年交易量
**/
exports.usedCarTradeRecentYears = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetUsedCarTradeRecentYears",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("二手车近几年交易量：usedCarTradeRecentYears【/api/DataAnalysis/GetUsedCarTradeRecentYears】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 个人收入分析
**/
exports.personalIncome = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/DataAnalysis/GetPersonalIncome",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("个人收入分析：personalIncome【/api/DataAnalysis/GetPersonalIncome】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*个人信息录入
*/
exports.personalMessage = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/UpdateCustInfo",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("个人信息录入：personalMessage【/api/Customer/UpdateCustInfo】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*添加好友
*/
exports.relationsApply = (para, callback) => {
	// 申请
	$.ajax({
		url: $.config.htUrl + "/api/CustRelations/AddRelationsApply",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("添加好友：relationsApply【/api/CustRelations/AddRelationsApply】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*获取加好友申请
*/
exports.custRelationsPageList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/CustRelations/GetCustRelationsPageList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("获取加好友申请：custRelationsPageList【/api/CustRelations/GetCustRelationsPageList】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
*处理好友申请
*/
exports.handleRelationsApply = (para, callback) => {
	// 添加
	$.ajax({
		url: $.config.htUrl + "/api/CustRelations/HandleRelationsApply?innerid={0}&status={1}".format(para.innerid, 1),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: {
		}
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("处理好友申请：handleRelationsApply【/api/CustRelations/HandleRelationsApply?innerid=innerid&status=1】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 查找会员信息
*/
exports.getCustById = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/GetCustById?innerid={0}".format(para.state),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("查找会员信息：getCustById【/api/Customer/GetCustById?innerid=state】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};

/**
* 获取点赞信息
*/
exports.getLaudatorListByCustid = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/GetLaudatorListByCustid?custid={0}".format(para.state),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取点赞信息：getLaudatorListByCustid【/api/Customer/GetLaudatorListByCustid?custid=state】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};

/**
* 获取访问量
*/
exports.getCarShareInfo = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/GetCarShareInfo?carid={0}".format(para.carid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取访问量：getCarShareInfo【/api/Car/GetCarShareInfo?carid=carid】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};

/**
* 批量删除车辆图片
*/
exports.delCarPictureList = (para, callback) => { 
	$.ajax({
		url: $.config.htUrl + "/api/Car/DelCarPictureList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("批量删除车辆图片：delCarPictureList【/api/Car/DelCarPictureList】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获取是否重复点赞
*/
exports.repeatPraise = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/RepeatPraise?openid={0}&custid={1}".format(para.openid, para.custid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取是否重复点赞：repeatPraise【/api/Customer/RepeatPraise?openid=openid&custid=custid】", para, data));
		callback(err, JSON.parse(data || '{}').errcode);
	});
};

/*
*车辆估价
 */
exports.carEvaluateByCar = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/GetCarEvaluateByCar",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, function(err, data) {
		$.plug.log.logger.info($.showFunLog("车辆估价：carEvaluateByCar【/api/Car/GetCarEvaluateByCar】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 批量添加车图片
*/
exports.addCarPictureList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/AddCarPictureList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("批量添加车图片：addCarPictureList【/api/Car/AddCarPictureList】", para, data));
		callback(err, JSON.parse(data || '{}').errcode);
	});
};

/**
* 根据ID获取车型信息
*/
exports.carModelById = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetCarModelById?innerid={0}".format(para.innerid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("根据ID获取车型信息：carModelById【/api/Base/GetCarModelById?innerid=innerid】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};

/**
* 热门品牌
*/
exports.carBrandHotTop = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetCarBrandHotTop?top=10",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("热门品牌：carBrandHotTop【/api/Base/GetCarBrandHotTop?top=10】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};

/**
* 获取车辆成交均价(车辆估值)
*/
exports.carEvaluateById = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/GetCarEvaluateById?id={0}".format(para.carid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取车辆成交均价(车辆估值)：carEvaluateById【/api/Car/GetCarEvaluateById?id=carid】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};

/**
* 获取本月本车型成交数量
*/
exports.carSales = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/GetCarSales?modelid={0}".format(para.modelid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取本月本车型成交数量：carSales【/api/Car/GetCarSales?modelid={0}".format(para.modelid) + "】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};

/**
* 全城搜车
*/
exports.searchCarPageList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/SearchCarPageList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("全城搜车：searchCarPageList【/api/Car/SearchCarPageList】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 绑定openid
*/
exports.bindingOpenid = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/BindOpenid?custid={0}&openid={1}".format(para.custid, para.openid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("绑定openid：bindingOpenid【/api/Customer/BindOpenid】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 我的礼劵列表
*/
exports.myCodeList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetMyCodeList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("我的礼劵列表：myCodeList【/api/Rewards/GetMyCodeList】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 根据城市id获取区列表
*/
exports.shopAreaByCityid = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetCountyList?cityid={0}".format(para.cityid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("根据城市id获取区列表：shopAreaByCityid【/api/Base/GetCountyList?cityid=cityid】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 根据区获取商户列表
*/
exports.shopByArea = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetShopByCountyid?countyid={0}".format(para.areaid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("根据区获取商户列表：shopByArea【/api/Rewards/GetShopByCountyid?countyid=areaid】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 上传图片
***/
exports.uploadImage = (req, callback) => {
	// 是否上传了图片
	var arrImgKey = [];
	if (req.body.img0) {
	    // 获取access_token
	    $.proxy.wechat.getAccessToken(req, function(err, access_token) {
    		(function(i) {
    			var fun = arguments.callee;
				$.fetch.fetchUrl('https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + req.body['img' + i], function(error, meta, body) {
					$.plug.qiniu.upload(body, function (err, result) {
						arrImgKey.push(result.key);
						i++;
						if (req.body['img' + i]) {
							fun(i);
						} else {
							callback(err, arrImgKey);
						}
					});
				});
    		})(0);
		});
	} else {
		callback(null, arrImgKey);
	}
};

/**
*
*/
exports.getCarInfoById = (req, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/GetCarInfoById?id=" + req.query.carid,
		type: "get",
		session: {
			id: req.sessionID,
			user: req.session.user
		}
	}, (err, data) => {
		//
		$.proxy.api.getCarPictureByCarid({
			sessionID: req.sessionID,
			user: req.session.user,
			id: req.query.carid
		}, function(err, imges) {
			callback(err, (
				(data, arrDate, arrIs) => {
					if (data && !data.Message) {
						for(var key of arrDate) {
							data[key] = new Date(data[key]).format("yyyy-MM");
							$.parseNullDate(data, key);
						}
						for(var key of arrIs) {
							data[key] = data[key] ? "是" : "否";
						}
						data.imges = imges.errmsg;
						data.qnUrl = $.config.qnUrl;
						return data;
					} else {
						return {};
					}
				})(JSON.parse(data).errmsg, [
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
				])
			);
		});
	});
}

/**
* 访问统计
*/
exports.upSeeCount = (req, callback) => {
	if (!req.query.isshow) {
		$.ajax({
			url: $.config.htUrl + "/api/Car/UpSeeCount?id={0}".format(req.query.carid),
			type: "get",
			session: {
				id: req.sessionID,
				user: req.session.user
			},
			data: {	
			}
		}, (err, data) => {
			callback(err, data);
		});
	} else {
		callback(null, {});
	}
};

/**
* 点赞数据录入
*/
exports.custPraise = (req, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/CustPraise",
		type: "post",
		session: {
			id: req.sessionID,
			user: req.session.user
		},
		data: {
		  "accountid": $.config.wx.accountid,
		  "nickname": req.query.userinfo.nickname,
		  "photo": req.query.userinfo.headimgurl,
		  "openid": req.query.openid,
		  "remarkname": "",
		  "area": "",
		  "sex": req.query.userinfo.sex,
		  "subscribe_time": "",
		  "subscribe": "",
		  "country": req.query.userinfo.country,
		  "province": req.query.userinfo.province,
		  "city": req.query.userinfo.city,
		  "tocustid": req.query.state, //会员id
		  "carid": req.query.carid //车辆id
		}
	}, function(err, data) {
		// 
		(function (data) {
			if (!data.errcode) {
				// 统计点赞次数
				$.ajax({
					url: $.config.htUrl + "/api/Car/UpPraiseCount?id={0}".format(req.query.carid),
					type: "get",
					session: {
						id: req.sessionID,
						user: req.session.user
					},
					data: {
					}
				}, function(err, data) {
					callback(err, JSON.parse(data));
				});	
			} else {
				callback(err, data);
			}
		})(JSON.parse(data));
	});
};

/**
* 礼劵详情
*/
exports.couponDetail = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetCodeInfo?code={0}".format(para.code),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("礼劵详情：couponDetail【/api/Rewards/GetCodeInfo?code=code】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获取礼券购买列表
*/
exports.mallCouponPageList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetMallCouponPageList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获取礼券购买列表：mallCouponPageList【/api/Rewards/GetMallCouponPageList】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 商城搜索商户列表
*/
exports.mallShopPageList = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetMallShopPageList",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("商城搜索商户列表：mallShopPageList【/api/Rewards/GetMallShopPageList】", para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 商城里商户详情
*/
exports.shopViewById = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Rewards/GetShopViewById?innerid={0}".format(para.id),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("商城里商户详情：shopViewById【/api/Rewards/GetShopViewById?innerid={0}】".format(para.id), para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 是否是会员
*/
exports.isCustByOpenid = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Customer/IsCustByOpenid?openid={0}".format(para.openid),
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para,
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("是否是会员：shopViewById【/api/Customer/IsCustByOpenid?openid={0}】".format(para.openid), para, data));
		callback(err, JSON.parse(data || '{}'));
	});
};

/**
* 获得当前配置城市
*/
exports.getAllCity = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Base/GetAllCity",
		type: "get",
		session: {
			id: para.sessionID,
			user: para.user
		}
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("获得城市：getAllCity【/api/Base/GetAllCity】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};

/**
* 批量上传图片
*/
exports.batchSaveCarPictureWechat = (para, callback) => {
	$.ajax({
		url: $.config.htUrl + "/api/Car/BatchSaveCarPictureWechat",
		type: "post",
		session: {
			id: para.sessionID,
			user: para.user
		},
		data: para
	}, (err, data) => {
		$.plug.log.logger.info($.showFunLog("批量上传图片：batchSaveCarPictureWechat【/api/Car/BatchSaveCarPictureWechat】", para, data));
		callback(err, JSON.parse(data || '{}').errmsg);
	});
};