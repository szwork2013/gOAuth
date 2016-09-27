// 配置数据Json
var config = module.exports = {
    // 数据库配置
    db: {
    },
    redis: {
        // Config for oauthserver
        oauthserver:{
            host: "172.28.189.101",
            port: 6379,
            db: 0,
            pass: 'P@ssword0'
        },
        session:{
            host: "172.28.189.101",
            port: 6379,
            db: 3,
            pass: 'P@ssword0'
        },
        userdb:{
            host: "172.28.189.101",
            port: 6379,
            db: 2,
            pass: 'P@ssword0'
        }
    },
    // 程序路由指定
    dir: "controller",
    // 调试日志开关
    debug: true,
    // 执行超过此值记日志
    time: 50,
    // 后台接口地址
    htUrl: "http://10.46.20.98:84",
    // 程序路由结构
    routes: {
        get: {
            '/': function(req, res) {
                res.redirect('/manager/home');
            }
        },
        post: {
        }
    },
    //路由过滤白名单
    filter: {
        //不受控文件夹
        "rules": ['js', 'css', 'fonts', 'html', 'img', 'common','font-awesome'],
        //白名单
        "white-list" : [
            '/',
            '/manager/home',
            '/oauth/token',
            '/api/manager/user',
            '/api/manager/UserSession',
            '/api/manager/userlogin'
        ],
        // 缓存过期时间单位秒, 一般为2个小时有效期
        "max-age": 3600 * 2
    },
    //oauth store Type: redis , memory 
    oauth_store_type:"redis", 
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
    }
};


//Specify config for prod and dev 
if (config.debug) {
    config.port = 8080;
    config.static = 'public';
} else {
    // 程序端口
    config.port = 8080;
	config.static = 'minify';
}
