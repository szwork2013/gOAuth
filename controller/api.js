/**
 * 路由：/api/wechatCertification 微信签名认证接口
 * 请求：get
 **/
exports.getWechatCertification = (req, res) => {
    // proxy文件夹wechat文件getJsapiTicket接口
    $.proxy.wechat.getJsapiTicket(req, (err, ticket) => {
        // 获得签名信息
        res.send($.sign(ticket, req.query.url));
    });
};

/**
 * 路由：/api/custPageList 搜索会员列表
 * 请求：get
 **/
exports.getCustPageList = (req, res) => {
	// proxy文件夹api文件custPageList方法
	$.proxy.api.custPageList($.setCookie(req, {
		pageindex: "1",
		pagesize: "20",
		oneselfid: req.session.user ? req.session.user["Innerid"] : "",
		mobile: req.query.mobile
	}), (err,data) => {
		res.send({
			id: req.session.user.Innerid,
			data: data.aaData
		});
	});
};

/**
 * 路由：/api/checkByMobile 验证手机号是否存在
 * 请求：post
 **/
exports.postCheckByMobile = (req, res) => {
	// proxy文件夹api文件checkByMobile方法
	$.proxy.api.checkByMobile($.setCookie(req, {
		mobile: req.body.mobile
	}), (err, data) => {
		res.send(data);
	});
};

/**
 * 路由：/api/provList 获取省份
 * 请求：post
 **/
exports.postProvList = (req, res) => {
	// proxy文件夹api文件provList方法
	$.proxy.api.provList($.setCookie(req, {}), (err, data) => {
		((obj) => {
			if (!data.errcode) {
				for (var o of data.errmsg) {
					if (!obj[o['Initial']])
						obj[o['Initial']] = [];
					obj[o['Initial']].push(o);
				}
				res.send(obj);
			}
		})({});
	});
};

/**
 * 路由：/api/cityList 获取城市
 * 请求：post
 **/
exports.postCityList = (req, res) => {
	// proxy文件夹api文件cityList方法
	$.proxy.api.cityList($.setCookie(req, {
		provid: req.body.provid
	}), (err, data) => {
		(obj => {
			if (!data.errcode) {
				for (var o of data.errmsg) {
					if (!obj[o['Initial']])
						obj[o['Initial']] = [];
					obj[o['Initial']].push(o);
				}
				res.send(obj);
			}
		})({});
	});
};

/**
 * 路由：/api/carBrand 获取品牌
 * 请求：post
 **/
exports.postCarBrand = (req, res) => {
	// proxy文件夹api文件carBrand方法
	$.proxy.api.carBrand($.setCookie(req, {}), (err, data) => {
		(obj => {
			if (!data.errcode) {
				// 加热门品牌
				$.proxy.api.carBrandHotTop($.setCookie(req, {}), (err, hot) => {
					obj["热门品牌"] = hot;
					for (var o of data.errmsg) {
						if (!obj[o['Initial']])
							obj[o['Initial']] = [];
						obj[o['Initial']].push(o);
					}
					res.send(obj);
				});
			}
		})({});
	});
};

/**
 * 路由：/api/carSeries 获取车系
 * 请求：post
 **/
exports.postCarSeries = (req, res) => {
	//传入参数
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	data.brandId=req.body.brandId;
	//调用proxy.api.carSeries
	$.proxy.api.carSeries(data, function(err,data){
		(obj => {
			if (!data.errcode) {
				for (var o of data.errmsg) {
					if (!obj[o['SeriesGroupName']])
						obj[o['SeriesGroupName']] = [];
					obj[o['SeriesGroupName']].push(o);
				}
				res.send(obj);
			}
		})({});
	});
};

/**
 * 路由：/api/carModel 获取车型
 * 请求：post
 **/
exports.postCarModel = (req, res) => {
	// proxy文件夹api文件carModel方法
	$.proxy.api.carModel($.setCookie(req, {
		seriesId: req.body.seriesId
	}), (err,data) => {
		(obj => {
			if (!data.errcode) {
				for (var o of data.errmsg) {
					if (!obj[o['Modelyear']])
						obj[o['Modelyear']] = [];
					obj[o['Modelyear']].push(o);
				}
				res.send(obj);
			}
		})({});
	});
};

/**
 * 路由：/api/codeByTypeKey 获取code
 * 请求：post
 **/
exports.postCodeByTypeKey = (req, res) => {
	// proxy文件夹api文件codeByTypeKey方法
	$.proxy.api.codeByTypeKey($.setCookie(req, {
		typekey: req.body.typekey
	}), (err,data) => {
		(obj => {
			if (!data.errcode) {
				for (var o of data.errmsg) {
					o["display"] = "none";
					if (!obj["display"])
						obj["display"] = [];
					obj["display"].push(o);
				}
				res.send(obj);
			}
		})({});
	});
};

/**
* 车辆保存
***/
exports.postAddCar = (req, res) => {
	// 第一步 车辆基础数据保存
	$.proxy.api.saveCar($.setCookie(req, {
		innerid: req.body.innerid,
		custid: req.session.user.Innerid,
		provid: req.body.provid,
		cityid: req.body.cityid,
		brand_id: req.body.brand_id,
		series_id: req.body.series_id,
		model_id: req.body.model_id,
		colorid: req.body.colorid,
		buytime: req.body.buytime,
		buyprice: req.body.buyprice,
		isproblem: req.body.isproblem,
		istain: req.body.istain,
		price: req.body.price,
		mileage: req.body.mileage,
		register_date: req.body.register_date,
		ckyear_date:req.body.ckyear_date,
		tlci_date:req.body.tlci_date,
		audit_date:req.body.audit_date,
		remark: req.body.remark,
		title: req.body.title
	}), (err, data) => {
		// 是否保存成功
		if (!data.errcode) {
			// 上传图片收集
			var medias = [];
			for (var i=0; i < 9; i ++) {
				if (req.body['img' + i]) {
					medias[i] = req.body['img' + i];
				}
			}
			// 获取access_token
			$.proxy.wechat.getAccessToken(req, (err, access_token) => {
				// 上传图片
				$.proxy.api.batchSaveCarPictureWechat($.setCookie(req, {
					"Carid": req.body.innerid || data.errmsg,   //车辆id
					"DelIds": JSON.parse(req.body.imgdel || "[]"),   // 需要删除的图片的id
					"AccessToken": access_token, //
					"MediaIdList": medias, //上传的图片的集合
					"mobile": req.session.user.Mobile //手机号
				}), (err, data) => {
					// 返回操作结果
					res.redirect(
						req.body.innerid
						? '/open/cars?showalert=success&pagetype=cars_edit'
						: '/open/cars?showalert=success&pagetype=cars'
					);
				});
			});
		} else {
			// 返回操作结果
			res.redirect(
				req.body.innerid
				? '/open/cars?showalert=warning&pagetype=cars_edit_err'
				: '/open/cars?showalert=warning&pagetype=cars_err'
			);
		}
	});
};

/**
* 车辆查看
***/
exports.postCarViewById = (req, res) => {
	var para={};
	para.sessionID=req.sessionID;
	para.user=req.session.user;
	para.id = req.body.id;
	$.proxy.api.carInfoById(para, function(err,data) {
		$.proxy.api.getCarPictureByCarid(para, function(err, imges) {
			res.send(((data, arrDate, arrIs) => {
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
					return false;
				}
			})(data.errmsg, [
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
			]));
		});
	});
};

/**
* 车辆成交
**/
exports.postDealCar = (req, res) => {
	//传入参数
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	data.innerid=req.body.innerid;
	data.dealdesc=req.body.dealdesc;
	data.dealprice=req.body.dealprice;
	//调用proxy.api.dealCar
	$.proxy.api.dealCar(data, function(err, data) {
		res.send(data);
	});
};

/**
* 车辆删除
**/
exports.postDeleteCar = (req, res) => {
	//传入参数
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	data.innerid=req.body.innerid;
	data.deletedesc=req.body.deletedesc;
	//调用proxy.api.deleteCar
	$.proxy.api.deleteCar(data, function(err,data) {
		res.send(data);
	});
};

/**
* 发送验证码
**/
exports.postSendVerification = (req, res) => {
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	data.Target=req.body.mobile;
	data.TType=req.body.ttype;
	data.Valid=120;
	data.Length=req.body.length;
	data.VType=req.body.vtype;
	data.UType=req.body.utype;
	//调用proxy.api.sendVerification
	$.proxy.api.sendVerification(data, function(err,data) {
		res.send(data);
	});
};

/**
* 认证信息录入
*/
exports.postCertification = (req, res) => {
	// 上传图片
	$.proxy.api.uploadImage(req, (err, arrKey) => {
		((para) => {
			//调用proxy.api.certification
			$.proxy.api.certification(para, function(err, data) {
				res.redirect('/open/home?showalert=success&pagetype=home');
			});
		})({
			sessionID: req.sessionID,
			user: req.session.user,
			custid: req.session.user.Innerid,
			idcard: req.body.idcard,
			realname: req.body.realname,
			enterprisename: req.body.enterprisename,
			licencecode: req.body.licencecode,
			licencearea: req.body.licencearea,
			organizationcode: req.body.organizationcode,
			taxcode: req.body.taxcode,
			relevantpicture: arrKey.join(",")
		});
	});
};

/**
* 分享统计
*/
exports.postShare = (req, res) => {
	var data={};
	data.id=req.body.id;
	data.sessionid=req.sessionID;
	data.user=req.session.user;

	$.proxy.api.shareTotal(data,function(err, data){
		res.redirect('/open/release');
	});
};

/**
*获取不同年龄段买家分布
**/
exports.getAgeArea=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.ageArea(data,function(err,data){
		res.send(data);
	});
};

/**
*获取买家性别比例
**/
exports.getGenterPer=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.genterPer(data,function(err,data){
		res.send(data);
	});
};

/**
*年度市场交易走势
**/
exports.getTradeLineByYear=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.tradeLineByYear(data, function(err,data){
		if (data && !data.Message) {
			res.send(data);
		} else {
			res.redirect('/open/login?showalert=warning&pagetype=maintain');
		}
	});
};

/**
*二手车使用年限分析
**/
exports.getUsedCarYearAnalysis=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.usedCarYearAnalysis(data, function(err,data){
		res.send(data);
	});
};

/**
*可接受的二手车行驶里程
**/
exports.getUsedCarAccept=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.usedCarAccept(data, function(err,data){
		res.send(data);
	});
};

/**
*3-5万公里满意度
**/
exports.getSatisfaction3To5=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.satisfaction3To5(data, function(err,data) {
		res.send(data);
	});
};

/**
*3-5万公里不满意度
**/
exports.getUnSatisfaction3To5=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.unSatisfaction3To5(data, function(err,data) {
		cres.send(data);
	});
};

/**
*1-3万公里满意度
**/
exports.getSatisfaction1To3 = (req,res) => {
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.satisfaction1To3(data, function(err,data){
		res.send(data);
	});
};

/**
*1-3万公里不满意度
**/
exports.getUnSatisfaction1To3=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.unSatisfaction1To3(data, function(err,data) {
		res.send(data);
	});
};

/**
*月度品牌热搜前10
**/
exports.getHotBrandTop10=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.hotBrandTop10(data, function(err,data) {
		if (data && !data.Message) {
			res.send(data);
		} else {
			res.redirect('/open/login?showalert=warning&pagetype=maintain');
		}
	});
};

/**
*二手车交易量全国占比排行前10省份
**/
exports.getUsedCarTradeTop10=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.usedCarTradeTop10(data, function(err,data) {
		res.send(data);
	});
};

/**
*二手车交易量全国占比排行倒数8省份
**/
exports.getUsedCarTradeLaset8=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.usedCarTradeLaset8(data, function(err,data) {
		res.send(data);
	});
};

/**
*二手车近几年交易量
**/
exports.getUsedCarTradeRecentYears=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.usedCarTradeRecentYears(data, function(err,data) {
		res.send(data);
	});
};

/**
*个人收入分析
**/
exports.getPersonalIncome=(req,res)=>{
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	$.proxy.api.personalIncome(data,function(err,data){
		if (data && !data.Message) {
			res.send(data);
		} else {
			res.redirect('/open/login?showalert=warning&pagetype=maintain');
		}
	});
};

/*---------------新-----------------*/
/*
* 个人信息录入页
*/
exports.postMember = (req, res) => {
	$.proxy.api.uploadImage(req, (err, arrKey) => {
		var data ={};
		data.Innerid=req.session.user.Innerid;
		data.Custname=req.body.custname;
		data.Email=req.body.email;
		if (arrKey[0]) {
			data.Headportrait = arrKey[0];
		}
		data.provid=req.body.provid;
		data.cityid=req.body.cityid;
		data.area=req.body.area;
		data.sex=req.body.sex;
		data.brithday=req.body.brithday;
		data.sessionID=req.sessionID;
		data.user=req.session.user;

		$.proxy.api.personalMessage(data, function(err, data) {
			res.redirect('/open/home?showalert=success&pagetype=member');
		});
	});
};

/**
* 添加好友申请
*/
exports.postAddRelationsApply = (req, res) => {
	var data={};
	data.sessionID=req.sessionID;
	data.user=req.session.user;
	data.Fromid=req.session.user.Innerid;
	data.Toid=req.body.innerid;
	data.Remark=req.body.remark;
	//
	$.proxy.api.relationsApply(data, function(err,data){
		// 获取
		var data2={};
		data2.sessionID=req.sessionID;
		data2.user=req.session.user;
		data2.pageindex="1";
		data2.pagesize="3";
		data2.status="0";
		data2.toid=req.body.innerid;
		//
		$.proxy.api.custRelationsPageList(data2,function(err,data3){
			if(data3.aaData[0]) {
				var data4={};
				data4.sessionID=req.sessionID;
				data4.user=req.session.user;
				data4.innerid=data3.aaData[0].Innerid;
				$.proxy.api.handleRelationsApply(data4, function(err, data5) {
					res.send(data5);
				});
			} else {
				res.send("");
			}
		});
	});
};

/**
* 根据ID获取车型信息
*/
exports.getCarModelById = (req, res) => {
	var para = {};
	para.sessionID = req.sessionID;
	para.user = req.session.user;
	para.innerid = req.query.innerid;
	// 根据ID获取车型信息
	$.proxy.api.carModelById(para, (err, data) => {
		res.send(data);
	});
};

/*
*车辆估值
 */
exports.postCarEvaluateByCar=(req,res)=>{
    var para={};
    para.sessionID=req.sessionID;
    para.user=req.session.user;
    para.cityid=req.body.cityid;
    para.modelid=req.body.model_id;
    para.registerdate=req.body.register_date;

    /*para.cityid=125;
    para.modelid=56;
    para.registerdate='2010-10';*/

    if(req.session && req.session.openid){
        para.openid = req.session.openid;
        cb();
    } else {
        req.session = req.session ? req.session : {
            user: {
                Innerid: req.query.state
            }
        };
        $.proxy.wechat.getAccessTokenByCode(req, function(err, wechat) {
            para.openid = wechat.openid;
            cb();
        });
    }

    function cb(){
        //调用proxy.api
        $.proxy.api.carEvaluateByCar({
        	sessionID: req.sessionID,
    		user: req.session.user,
			model_id: para.modelid,
			register_date: para.registerdate,
			cityid: para.cityid,
			openid:para.openid
		}, (err,data)=>{
            res.send(data);
        });
    }
};

/*
* 新车指导价
*/
exports.getCarEvaluateById = (req, res) => {
	// 调用proxy文件夹api文件carEvaluateById方法
	$.proxy.api.carEvaluateById({
		sessionID: req.sessionID,
		user: req.session.user,
		carid: req.query.carid
	}, (err, data) => {
		res.send({val: data});
	});
};

/*
* 新车成交量
*/
exports.getCarSales = (req, res) => {
	// 调用proxy文件夹api文件carEvaluateById方法
	$.proxy.api.carSales({
		sessionID: req.sessionID,
		user: req.session.user,
		modelid: req.query.modelid
	}, (err, data) => {
		res.send({val: data});
	});
};

/*
* 全城搜车分页接口
*/
exports.getCarsearch = (req, res) => {
	// 分解年区间
	var year = (req.query.choose_year || "-").split("-"),
		interval = (req.query.choose_interval || "-").split("-");
	// 调用proxy文件夹api文件searchCarPageList接口
	$.proxy.api.searchCarPageList($.setCookie(req, {
		sessionID: req.sessionID,
		user: req.session.user,
		custid: req.session.user.Innerid,
		pageindex: req.query.pageindex || "1",
		pagesize: 10,
		minyear: year[0],
		maxyear: year[1],
		minprice: interval[0],
		maxprice: interval[1],
		brand_id: req.query.choose_brand || "",
		series_id: req.query.choose_series || "",
		cityid: req.query.choose_city || "125"
	}), function(err, data) {
		// 返回结果数据
		res.send({
			cars: data.aaData,
			qnUrl: $.config.qnUrl,
			isSs: !(!year[0] && !year[1] && !interval[0] && !interval[1] && !req.query.choose_brand && !req.query.choose_series),
			ishide: 'false'
		});
	});
};

/*
* 全城搜车分页接口
*/
exports.getCarsearchAll = (req, res) => {
	// 分解年区间
	var year = (req.query.choose_year || "-").split("-"),
		interval = (req.query.choose_interval || "-").split("-");
	// 调用proxy文件夹api文件searchCarPageList接口
	$.proxy.api.searchCarPageList($.setCookie(req, {
		sessionID: req.sessionID,
		user: req.session.user,
		pageindex: req.query.pageindex || "1",
		pagesize: 10,
		minyear: year[0],
		maxyear: year[1],
		minprice: interval[0],
		maxprice: interval[1],
		brand_id: req.query.choose_brand || "",
		series_id: req.query.choose_series || "",
		cityid: req.query.choose_city || "125"
	}), function(err, data) {
		// 返回结果数据
		res.send({
			cars: data.aaData,
			qnUrl: $.config.qnUrl,
			isSs: !(!year[0] && !year[1] && !interval[0] && !interval[1] && !req.query.choose_brand && !req.query.choose_series),
			ishide: 'true'
		});
	});
};

/**
* 修复openid未得到
***/
exports.getOpenid = (req, res) => {
	// proxy文件夹wechat文件getAccessTokenByCode方法
	$.proxy.wechat.getAccessTokenByCode(req, function(err, wechat) {
		// proxy文件夹api文件bindingOpenid方法
		$.proxy.api.bindingOpenid($.setCookie(req, {
			custid: req.session.user.Innerid,
			openid: wechat.openid
		}), function(err, data) {
			if (data.errcode) {
				res.redirect('/open/home?showalert=warning&pagetype=openidE');
			} else {
				res.redirect('/open/home?showalert=success&pagetype=openidS');
			}
		});
	});
};

/**
* 获得区域
***/
exports.getShopAreaByCityid = (req, res) => {
	// 调用proxy文件夹api文件shopAreaByCityid方法
	$.proxy.api.shopAreaByCityid($.setCookie(req, {
		cityid: req.query.cityid
	}), (err, data) => {
		res.send(data);
	});
};

/**
* 获得店铺
***/
exports.getShopByArea = (req, res) => {
	// 调用proxy文件夹api文件shopByArea方法
	$.proxy.api.shopByArea($.setCookie(req, {
		areaid: req.query.areaid
	}), (err, data) => {
		console.log(data);
		res.send(data);
	});
};

// 商品购买列表
exports.getMallCouponPageList = (req, res) => {
	// proxy文件夹api文件mallShopPageList方法
	$.proxy.api.mallCouponPageList($.setCookie(req, {
		cityid: req.query.cityid || "",
		Shopid: req.query.shopid || "",
		Countyid: req.query.areaid || "",
		Title: req.query.title || "",
		CardTypes: req.query.cardTypes || "",
		PageIndex: req.query.pageindex || "1",
		PageSize: "10"
	}), (err, data) => {
		res.send({
			list: data.aaData,
			qnUrl: $.config.qnUrl,
			type: 1
		});
	});
};

// 门店购买列表
exports.getMallShopPageList = (req, res) => {
	// proxy文件夹api文件mallShopPageList
	$.proxy.api.mallShopPageList($.setCookie(req, {
		cityid: req.query.cityid || "",
		CardTypes: (req.query.cardTypes || "").replace(/,+/g,",").replace(/^,/,"").replace(/,$/,"") ,
		Shopname: req.query.title || "",
		Countyid: req.query.areaid || "",
		PageIndex: req.query.pageindex || "1", //分页页码
		PageSize: "10" //分页大小
	}), (err, data) => {
		res.send({
			list: data.aaData,
			qnUrl: $.config.qnUrl,
			type: 2
		});
	});
};

// 商城中间页
exports.getPageShop = (req, res) => {
	// 是否存在code
	if (req.query.code) {
		// proxy文件夹wechat文件getAccessTokenByCode方法
		$.proxy.wechat.getAccessTokenByCode(req, function(err, wechat) {
			// 是否成功获取openid
			if (wechat.openid) {
				// 缓存openid
				req.session.openid = wechat.openid;
				// 判断是否是会员
				$.proxy.api.isCustByOpenid($.setCookie(req, {
					openid: wechat.openid
				}), (err, data) => {
					if (data.errcode == 0) {
						res.redirect('/open/mallCouponPageList');
					} else {
						res.redirect('/open/register');
					}
				});
			} else {
				res.redirect('/open/login');
			}
		});
	} else {
		res.redirect('/open/login');
	}
};

/**
 * 路由：/api/login 会员登录
 * 请求：post
 **/
exports.postLogin = (req, res) => {
	// 第一步 验证手机号是否存在
    $.plug.promise((data, cb) => {
    	// proxy文件夹api文件checkByMobile方法
    	$.proxy.api.checkByMobile($.setCookie(req, {
    		mobile: req.body.mobile
		}), (err, data) => {
			// 手机号是否存在
			if (data.errcode) {
	    		cb({});
	    	} else {
	    		res.send({
	    			errcode: 400,
	    			errmsg: "手机号不存在"
	    		});
	    	}
    	});
    })
    // 第二步 会员登录
    .end((err, data) => {
    	// proxy文件夹api文件login方法
		$.proxy.api.login($.setCookie(req, {
			password: req.body.password, // 密码
			mobile: req.body.mobile	// 手机号
		}), (err, login) => {
			// 引用缓存数据库
			var redis = new $.plug.redis();
			// 结果是否合法
			if (login && !login.Message) {
				if (!login.errcode) {
					if (req.session.openid) {
						data[(req.session.openid || "") + "_mobile"] = req.body.mobile;
						data[(req.session.openid || "") + "_password"] = req.body.password;
						redis.rSets(data, function(err, redis) {
							redis.end();
						});
					}
					req.session.user = login.errmsg;
					res.send(login);
				} else {
					if (req.session.openid) {
						redis.del((req.session.openid || "") + "_mobile");
						redis.del((req.session.openid || "") + "_password");
						redis.end();
					}
					res.send(login);
				}
			} else {
				res.send({
	    			errcode: 499,
	    			errmsg: "服务器异常"
	    		});
			}
		});
	});
};

/**
 * 路由：/api/register 会员注册
 * 请求：post
 **/
exports.postRegister = (req, res) => {
	// 第一步 注册
	$.plug.promise((data, cb) => {
		// proxy文件夹api文件register方法
    	$.proxy.api.register($.setCookie(req, {
			username: req.body.mobile || "", //用户名
			password: req.body.password || "", //密码[必填]
			mobile: req.body.mobile || "", //手机号[必填]
			vcode: req.body.vcode || "", //验证码[必填]
			wechat: {
				openid: req.session.openid || ""
			}
    	}), (err, register) => {
    		// 注册结果是否异常
    		if (register && !register.Message) {
    			if (!register.errcode) {
					cb({});
				} else {
					res.send(register);
				}
			} else {
				res.send({
	    			errcode: 499,
	    			errmsg: "服务器异常"
	    		});
			}
    	});
	})
	// 第二步 缓存注册信息
	.then((data, cb) => {
		// 自动登录缓存
		if (req.session.openid) {
			// 缓存登录数据
			var redis = new $.plug.redis();
			data[(req.session.openid || "") + "_mobile"] = req.body.mobile;
			data[(req.session.openid || "") + "_password"] = req.body.password;
			// 设置缓存
			redis.rSets(data, function(err, redis) {
				redis.end();
			});
		}
		// 模拟登录
		cb({});
	})
	// 第三步 模拟登录
	.end((err, data) => {
		// proxy文件夹api文件login方法
		$.proxy.api.login($.setCookie(req, {
			mobile: req.body.mobile,
			password: req.body.password
		}), function(err, login) {
			// 登录结果是否异常
			if (login && !login.Message && !login.errcode) {
				req.session.user = login.errmsg;
				res.send({
	    			errcode: 0,
	    			errmsg: "成功"
	    		});
			} else {
				res.send({
	    			errcode: 498,
	    			errmsg: "自动登录异常"
	    		});
			}
		});
	});
};

/**
 * 路由：/api/recover 密码找回
 * 请求：post
 **/
exports.postRecover = (req, res) => {
	// proxy文件夹api文件updatePassword方法
	$.proxy.api.updatePassword($.setCookie(req, {
		NewPassword: req.body.password, // 密码
		Mobile: req.body.mobile, // 手机号
		VCode: req.body.vcode // 验证码
	}), (err, recover) => {
		// 重置结果是否异常
		if (recover && !recover.Message) {
			res.send(recover);
		} else {
			res.send({
    			errcode: 499,
    			errmsg: "服务器异常"
    		});
		}
	});
};

/**
 * 路由：/api/exit 退出
 * 请求：get
 **/
exports.getExit = (req, res) => {
	// 第一步 根据custid查openid
	$.plug.promise((data, cb) => {
		$.proxy.api.custById($.setCookie(req, {
			custid: req.session.user ? req.session.user.Innerid : ""
		}), function(err, user) {
			if (user.Wechat && user.Wechat.Openid) {
				cb(user.Wechat.Openid);
			} else {
				res.redirect('/open/login');
			}
		});
	})
	// 第步二清理redis信息
	.end((err, openid) => {
		var redis = new $.plug.redis();
		redis.del((openid || "") + "_mobile");
		redis.del((openid || "") + "_password");
		redis.end();
		res.redirect('/open/login');
	});
};

/**
 * 路由：/api/carImgSaveMsg 主动推消息
 * 请求：post
 **/
exports.postCarImgSaveMsg = (req, res) => {
	req.body.qnurl = $.config.qnUrl;
	res.send(
    	$.emit(
	    	req.body.mobile,
	    	'imgSaveMsg',
	    	{
	    		code: '200', msg: req.body
	    	}
	    )
	    ? { code: 200, msg: "成功" }
	    : { code: 201, msg: "失败" }
    );
};
