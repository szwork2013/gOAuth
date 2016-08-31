console.time("程序启动所耗时间");
// 自动引入
((req, pro) => {
    // 全局模块库
    global.$ = pro;
    // 循环引用所有资源
    for (var un in req)
        $[un] = require(req[un]);
    // 程序入口
    $.plug.autoroute(
        // app设置
        app => {
            console.timeEnd("程序启动所耗时间");
            // 打印端口
            console.log(new Date() + " 当前端口：" + app.get("port"));
            //设置视图文件夹
            app.set('views', $.path.join(__dirname, "views"));
            //设置使用ejs作为模版
            app.set('view engine', 'ejs');
            // 设置压缩传输
            app.use($.compression());
            // 定义默认文件上传路径
            app.use($.multer({ dest: "./public/upload" }));
            // 创建redis缓存服务器
            app.use($['express-session']({
                resave: false,
                saveUninitialized: true,
                store: new ($['connect-redis']($['express-session']))($.config.redis),
                secret: 'keyboard cat'
            }));
            // 路由拦截
            app.use($.plug['route-filter']);
            // 表单提交支持
            app.use($['body-parser'].urlencoded({ extended: true }));
            // 设置静态文件根目录
            app.use($.express.static($.path.join(__dirname, $.config.static)));
            // 捕捉所有未知异常
            app.use((err, req, res, next) => {
                console.log(err);
                next(err);
            });
        }
    );
})(
    // 加载集合
    require("./require"),
    // 全局引擎模板
    {
        // 模块自动加载器
        require: (path, arr) => {
            //递归引用
            return ((res, dirPath) => {
                // 闭包赋值
                return (function (fun, files) {
                    //变量文件
                    for (f of files) {
                        // 绝对路径
                        (function (strPath) {
                            // 路径文件对象
                            (function (stats) {
                                //是否是文件夹
                                if (stats.isDirectory()) {
                                    //层
                                    res[f] = {};
                                    //递归
                                    fun(res[f], strPath);
                                } else {
                                    //动态引用
                                    res[$.path.basename(strPath, '.js')] = require(strPath);
                                }
                            })(
                                $.fs.statSync(strPath)
                            );
                        })(
                            $.path.join(dirPath, f)
                        );
                    }
                    // 引用对象集合
                    return res;
                })(
                    // 当前方法
                    arguments.callee,
                    // 读path目录结构
                    $.fs.readdirSync(dirPath)
                );
            })({}, $.path.join(__dirname, path));
        }
    }
);
