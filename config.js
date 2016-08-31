// 配置数据Json
var config = module.exports = {
    // 数据库配置
    db: {
    },
    redis: {
        host: "172.28.189.101",
        port: 6379,
        db: 3,
		pass: 'P@ssword0'
    },
    // 程序路由指定
    dir: "controller",
    // 调试日志开关
    debug: false,
    // 执行超过此值记日志
    time: 50,
    // 后台接口地址
    htUrl: "http://10.46.20.98:84",
	// 微信url
    wechatUrl: "http://wechat.95taoche.com",
    // 程序路由结构
    routes: {
        get: {
            '/': function(req, res) {
                res.redirect('/open/login');
            }
        },
        post: {
        }
    },
    filter: {
        "rules": ['js', 'css', 'fonts', 'html', 'img', 'api', 'template', 'common', 'merchant'],
        "white-list": [
            '/open/login',
            '/open/register',
            '/',
            '/open/recover',
            '/open/valuation',
            '/open/valuationResult',
            "/open/mallCouponPageList",
            "/open/mallShopPageList",
            "/open/shopViewById"
        ],
        "rules-white-list" : [
            '/open/carsearchAll',
            '/open/cardetailAll',
            '/open/carBrandAll'
        ],
        // 缓存过期时间单位秒
        "max-age": 3600 * 48
    },
    // websocket配置
    socket: {
        // socket端口
        port: 8989,
        // socket连接池
        clients: {},
        // socket用户池
        users: [],
        // 缓存消息
        message: {},
        // 自定义监听
        listeners: {
        }
    },
	//客服电话
	phone: '400-178-9515',
	watermark: '|watermark/1/image/d3d3Ljk1dGFvY2hlLmNvbS9jb21tb24vaW1nL3dhdGVybWFyay5wbmc=/dissolve/100/gravity/SouthEast/dx/10/dy/10/ws/0.08'
};

if (config.debug) {
    config.port = 8080;
    config.static = 'public';
    config.wx = {
        accountid: 'gh_26a24ceb453a',
        appid: 'wxce597c313a3f590b',
        appsecret: '521b9d23c5b60a14772716f36fb6f1ea'
    };
    config.redirect_uri = '%77%65%69%31%33%32%30%35%31%37%34%37%39%30%2E%69%6D%77%6F%72%6B%2E%6E%65%74:13134';
	config.qnBucket = "chinaccn";
    config.qnUrl = "http://7xlopw.com1.z0.glb.clouddn.com/";
} else {
    // 程序端口
    config.port = 8080;
	config.static = 'minify';
    config.wx = {
        accountid: 'gh_8c605a53c547',
        appid: 'wxa8cba3b12869509a',
        appsecret: 'b35c6675e59f3a817016a69bd9a60c7f'
    };
    config.redirect_uri = '%72%65%67%2E%39%35%74%61%6F%63%68%65%2E%63%6F%6D';
	config.qnBucket = "chinaccn";
    config.qnUrl = "http://7xnwvr.com1.z0.glb.clouddn.com/";
}
