/**
 * 作者:彭文宽
 * 时间:2014/12/25
 */
var redis = require("redis");

/**
 * 创建Redis连接
 * @param ip
 */
var rCreate = function() {
    //创建连接
    var client = redis.createClient(6379, $.config.redis.host, {
        auth_pass: $.config.redis.pass
    });

    /**
     * Redis的异常捕捉机制
     */
    client.on('error', function(err) {
        console.log("Redis发现异常:\r\n" + err);
    });

    /**
     * 设置Redis中Key和值
     * @param key
     * @param val
     * @param callback 3个参数,错误,结果,服务对象
     */
    var rSet = function(key, val, callback) {
        //删除键
        client.del(key);
        //对应数据类型存值
        if (val instanceof Array) {
            client.set(key, val, function(err, res) {
                callback({ err: err, res: res }, client);
            });
        } else if (val instanceof Object) {
            client.hmset(key, val, function(err, res) {
                callback({ err: err, res: res }, client);
            });
        } else {
            client.set(key, val, function(err, res) {
                callback({ err: err, res: res }, client);
            });
        }
    };
    client.rSet = rSet;

    /**
     * 批量设置Redis中Key和值
     * @param obj
     * @param callback 2个参数,结果和服务对象
     */
    client.rSets = function(obj, callback) {
        //值支持对象
        if (obj instanceof Object) {
            var i = 0, data = [];
            //键值对设置
            for (var key in obj) {
                rSet(key, obj[key], function(o, c) {
                    data[i] = { err: o.err, res: o.res };
                    if (i == (Object.keys(obj).length - 1)) {
                        callback(data, c);
                    }
                    i++;
                });
            }
        }
    };

    /**
     * 获取Redis中Key对应的值
     * @param key
     * @param callback 3个参数,错误,结果,服务对象
     */
    var rGet = function(key, callback) {
        //先判断是否存在key
        client.exists(key, function(err, res) {
            //存在key
            if (res == 1) {
                //获取字符串
                client.get(key, function(er, data) {
                    if (data == undefined) {
                        //获取对象
                        client.hgetall(key, function(e, o) {
                            callback({ err: e, res: o }, o);
                        });
                    } else {
                        callback({ err: er, res: data }, data);
                    }
                });
            } else {
                callback({}, "");
            }
        });
    };
    client.rGet = rGet;

    /**
     * 批量获取Redis中Key对应的值
     * @param arr key数组
     * @param callback 2个参数,结果和服务对象
     */
    client.rGets = function(arr, callback) {
        //只支持数组
        if (arr instanceof Array) {
            var data = [], cs = [];
            //批量键值获取
            arr.forEach(function(key, i) {
                rGet(key, function(o, c) {
                    data[i] = { err: o.err, res: o.res };
                    cs[i] = c;
                    if (i == (arr.length - 1)) {
                        callback(data, cs);
                    }
                });
            });
        }
    };
    return client;
};
module.exports = rCreate;