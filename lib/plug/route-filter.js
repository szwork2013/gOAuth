/* -----路由拦截-----
 * 调用：app.js中调用
 **/
module.exports = (req, res, next) => {
	// session 控制
	((urlArr, s) => {
		// 追加返回值
		res.locals.watermark = $.config.watermark;
		// 拦截权限控制
		if ($.config.filter['rules-white-list'].indexOf(req.url.indexOf("?") != -1 ? req.url.split("?")[0] : req.url) != -1) {
			next();
		}  else {
			if (
				$.config.filter.rules.indexOf(urlArr[1]) != -1 ||
				$.config.filter['white-list'].indexOf(req.url.indexOf("?") != -1 ? req.url.split("?")[0] : req.url) != -1
			) {
				if (req.session) {
					next();
				} else {
					res.redirect('/open/login');
				}
			} else {
				if (req.session && req.session.user) {
		        	req.session.cookie.expires = new Date(Date.now() + 1000*s);
		            req.session.cookie.maxAge = 1000*s;
		            req.session.save(function(err) {
		            	next();
		            });
				} else {
					res.redirect('/open/login');
				}
			}
		}
	})(
		req.url.split("/"),
		// 获取过期时间
		$.config.filter['max-age']
	);
};

// /**
// * 拦截规则
// **/
// function filter(req, time) {
// 	// 取路由
// 	var routeStr = req.url.indexOf("?") != -1 ? req.url.split("?")[0] : req.url;
// 	// 是否在白名单中
// 	if ($.config.filter['rules-white-list'].indexOf(routeStr) != -1) {

// 	}
// }