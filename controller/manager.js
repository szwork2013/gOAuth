/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.getHome = (req, res) => {
	// 整合参数
	(function (para) {
		res.render('common/layout', {
					// 页面名称
					title: "Home page",
					// 需要打开的页面路径
					pagePath: '../page/home',
					// 头部路径
					headerPath: './layout_header',
					pageJson:{}
				});
	})({
		// 传人参数
		sessionID: 1,//req.sessionID,
		user: 1,
		custid: 1
	});
};


/***
* Controller for oauth2.0
***/
exports.getUser = (req, res) => {
	// 整合参数
	(function (para) {
		res.render('common/layout', {
					// 页面名称
					title: "Home page",
					// 需要打开的页面路径
					pagePath: '../page/home',
					// 头部路径
					headerPath: './layout_header',
					pageJson:{}
				});
	})({
		// 传人参数
		sessionID: 1,//req.sessionID,
		user: 1,
		custid: 1
	});
};


/***
* Controller for oauth2.0
***/
exports.getResource = (req, res) => {
	// 整合参数
	(function (para) {
		res.render('common/layout', {
					// 页面名称
					title: "Home page",
					// 需要打开的页面路径
					pagePath: '../page/home',
					// 头部路径
					headerPath: './layout_header',
					pageJson:{}
				});
	})({
		// 传人参数
		sessionID: 1,//req.sessionID,
		user: 1,
		custid: 1
	});
};