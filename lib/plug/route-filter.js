/* -----路由拦截-----
 * 调用：app.js中调用
 **/
module.exports = (req, res, next) => {
	var urlRoutPart =  req.url.indexOf("?") != -1 ? req.url.split("?")[0] : req.url;
	var urlArr=req.url.split("/");

	// 拦截权限控制
	if ($.config.filter.rules.indexOf(urlArr[1]) != -1 || 
		$.config.filter['white-list'].indexOf(urlRoutPart) != -1) {
		next();
	} else if(urlArr[1] == "api"){
		//oauthserver 授权接口
		$.plug.oauth20($.config.oauth_store_type).middleware.bearer(req,res , (req, res) => {
			next();
		});
	} 
	else {
		if (req.session && req.session.user) {
  		      	//req.session.cookie.expires = new Date(Date.now() + 1000*s);
  		        //req.session.cookie.maxAge = 1000*s;
  		          // req.session.save(function(err) {
          	next();
  		          // });
		} else {
			res.send('No permission');
		}
	}
};