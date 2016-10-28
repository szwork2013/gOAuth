var
util = require('util'),
async = $.async,
redis = $.plug.redis.userdbserver;
var uuid = require('node-uuid');
var KEY = {
    USER         : 'user:%s',
    USER_USERNAME: 'username:%s'
};

module.exports.KEY = KEY;

/**/
module.exports.createuser = (user,callback) => {
    var id,sql,isnew;
    async.waterfall([
            //检察请求参数完整性
        function (cb) {
            if (!user || !user.name)
                return cb($.plug.resultformat(30001, "name／status is mandatory"));

            //检察唯一性
            if(!user.id)
            {
                $.db.mysql.gd.query("select count(1) as count from user where name='{0}'".format(user.name), (err,data) => {
                    if (data[0].count > 0) return cb($.plug.resultformat(30006, "User is already existing"));
                    cb();
                });
            }else cb();
        },
        function (cb) {
            if(!user.id)
            {
                isnew = true;
                var mobile_regx = /^(?:13\d|15\d|18[123456789])-?\d{5}(\d{3}|\*{3})$/;
                var email_reg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi;
                user.mobile = mobile_regx.test(user.name)? user.name:"";
                user.email = email_reg.test(user.name)? user.name:"";

                user.id = uuid.v4();
                $.plug.crypto.encrypt(user.password, $.config.cryptsalt, (maskpw)=>{
                    user.password = maskpw;
                });

                sql = "\
                    INSERT INTO `user`\
                        (`id`,\
                         `name`,\
                         `password`,\
                         `status`,\
                         `type`,\
                         `mobile`,\
                         `email`,\
                         `create_dt`,\
                         `create_user`)\
                    VALUES \
                        ('{0}', \
                        '{1}', \
                        '{2}', \
                        {3},\
                        {4},\
                        '{5}',\
                        '{6}',\
                        UNIX_TIMESTAMP(),\
                        '{7}'); \
                    ".format(
                        user.id,
                        user.name,
                        user.password,
                        user.status,
                        user.type,
                        user.mobile,
                        user.email,
                        'admin');//todo 修改成当前操作用户
            } else {
                sql = "\
                    UPDATE `user`\
                    SET\
                        `status` = {1},\
                        `type` = {2},\
                        `mobile` = '{3}',\
                        `email` ='{4}',\
                        `modify_dt` = UNIX_TIMESTAMP(),\
                        `modify_user` = '{5}'\
                    WHERE `id` = '{0}';\
                    ".format(
                        user.id,
                        user.status,
                        user.type,
                        user.mobile,
                        user.email,
                        'admin');//todo 修改成当前操作用户
            }
            cb();
        },
        function (cb) {
            $.db.mysql.gd.query(sql, (err,data) => {
                if (err) return cb($.plug.resultformat(40001, err));
                cb();
            });
        },
        //保存附加信息
        function (cb) {
             var cust_info_sql;
             if(isnew){
                    cust_info_sql = "\
                    INSERT INTO `cust_info`\
                        (`id`,\
                        `name`,\
                        `compcode`,\
                        `compname`,\
                        `contact`,\
                        `identitytype`,\
                        `identitycode`,\
                        `create_dt`,\
                        `create_user`)\
                    VALUES \
                        ('{0}', \
                        '{1}', \
                        '{2}', \
                        '{3}',\
                        '{4}',\
                        {5},\
                        '{6}',\
                        UNIX_TIMESTAMP(),\
                        '{7}'); \
                    ".format(
                        user.id,
                        user.name,
                        user.compcode?user.compcode:'',
                        user.compname?user.compname:'',
                        user.contact?user.contact:'',
                        user.identitytype?user.identitytype:0,
                        user.identitycode?user.identitycode:'',
                        user.id);
                }else{
                    cust_info_sql = "\
                      update `cust_info`\
                      set `name` = '{1}',\
                        `compcode`= '{2}',\
                        `compname`= '{3}',\
                        `contact`= '{4}',\
                        `identitytype`= {5},\
                        `identitycode`= '{6}',\
                        `modify_dt`= UNIX_TIMESTAMP(),\
                        `modify_user`= '{7}'\
                    where id='{0}';\
                    ".format(
                        user.id,
                        user.name,
                        user.compcode?user.compcode:'',
                        user.compname?user.compname:'',
                        user.contact?user.contact:'',
                        user.identitytype?user.identitytype:0,
                        user.identitycode?user.identitycode:'',
                        user.id);
                }
                $.db.mysql.gd.query(cust_info_sql, (err,data) => {
                    //if (err) return cb($.plug.resultformat(40001, err));
                    cb();
                });
        },
        //添加redis缓存逻辑
        function (cb) {
           // redis.hmset(util.format(KEY.USER, user.id), user,(err, data)=>{
           //      if (err) return callback($.plug.resultformat(40001, err));
           //      redis.set(util.format(KEY.USER_USERNAME, user.name),user.id);
           //      callback($.plug.resultformat(0, ""));
           // });
           cb();
        }
    ],
    function (err) {
        if (err) {
            callback(err);
        } else {
            callback($.plug.resultformat(0, '',{id:user.id}));
        }
    });
};

/*分页获取所有的用户*/
module.exports.allusers = (para, callback) =>{
    var keys = [],list = [];
    async.waterfall([
        //检察请求参数完整性
        function (cb) {
            if (!para.from || !para.size||!Number(para.from)||!Number(para.size))
                return cb($.plug.resultformat(40001, "from and size is mandatory, and should be number"));

            sql = "\
                select `id`\
                from `user`\
                where 1=1 ";

            if(para.name){
                sql += " and name like '{0}%' ".format(para.name);
            }
            if(para.mobile){
                sql += " and mobile like '{0}%' ".format(para.mobile);
            } 
            if(para.email){
                sql += " and email like '{0}%' ".format(para.email);
            } 
            if(para.type){
                sql += " and type = {0} ".format(para.type);
            }

            cb();
        },
        //获取分页后的Key
        function (cb) {
            var papgingsql = "\
                select \
                    `id`,\
                    `name`,\
                    `status`,\
                    `type`,\
                    `mobile`,\
                    `email`,\
                    `create_dt`,\
                    `create_user`,\
                    `modify_dt`,\
                    `modify_user`\
                from `user`\
                where `id` in ({0})\
                order by `create_dt` desc\
                limit {1},{2};\
                ".format(
                    sql,
                    para.from - 1,
                    para.size
                );
  
            $.db.mysql.gd.query(papgingsql, (err, data) => {
                   if (err) return cb($.plug.resultformat(40001, err));
                   return cb(null,data);
            });
            // var from = para.from - 1;
            // var size = Number(para.from) + Number(para.size) - 1;
            // redis.keys(util.format(KEY.USER,"*"),(err, data) => {
            //     if (err) return cb($.plug.resultformat(40001, err));

            //     for(var i = from ;i < size ; i++ ) {
            //        if(i > data.length) return cb();
            //        if(data[i])
            //        {
            //           keys.push(data[i]);
            //        }
            //     };
            //     cb();
            // });
        },
        //计算数量
        function (data,cb) {
            sql = "\
                select count(1) as count\
                from `user`\
                where 1=1 ";

            if(para.name){
                sql += " and name like '{0}%' ".format(para.name);
            }
            if(para.mobile){
                sql += " and mobile like '{0}%' ".format(para.mobile);
            } 
            if(para.email){
                sql += " and email like '{0}%' ".format(para.email);
            } 
            if(para.type){
                sql += " and type = {0} ".format(para.type);
            }
            console.log(sql);

            $.db.mysql.gd.query(sql, (err, countdata) => {
                if (err) return cb($.plug.resultformat(40001, err));
                
                return cb(null,{
                    count: countdata[0].count,
                    result: data
                });
            });
            // async.each(keys,(formatid, callback) => {
            //     fetchuserbyid(formatid, (err, data)=>{
            //         if(data) list.push(data);
            //         callback();
            //     });
            // },(err)=> {
            //     if (err) return cb($.plug.resultformat(40001, err));
            //     cb();
            // });
        }],
        function (err,data) {
           if (err) {
              callback(err);
           } else {
              callback($.plug.resultformat(0,'', data));
           }
           //  redis.keys(util.format(KEY.USER,"*"),(err, countresult) => {
           //      var  data = {
           //          count: countresult.length,
           //          result:list
           //      };
           //      if (err) {
           //          callback(err);
           //      } else {
           //          callback($.plug.resultformat(0,'', data));
           //     }
           // });
    });
};

/*获取单个用户信息*/
var fetchuserbyid = (formatid, callback) =>{
    redis.hgetall(formatid,(err, data) =>{
        if (err) return callback(err);
        callback(null,data);
    });
};

module.exports.userbyid = (id, callback) =>{
    var sql = "\
               select \
                    u.`id`,\
                    u.`name`,\
                    u.`status`,\
                    u.`type`,\
                    u.`mobile`,\
                    u.`email`,\
                    u.`create_dt`,\
                    u.`create_user`,\
                    u.`modify_dt`,\
                    u.`modify_user`,\
                    ci.`compcode`,\
                    ci.`compname`,\
                    ci.`contact`,\
                    ci.`identitytype`,\
                    ci.`identitycode`\
                from `user` as u\
                left join cust_info as ci on u.id = ci.id\
                WHERE u.id = '{0}';\
                ".format(id);

    $.db.mysql.gd.query(sql, (err, data) => {
        if (err) return callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, "", data[0] ));
     });

    // fetchuserbyid(util.format(KEY.USER,id),(err, data)=>{
    //     if (err) callback($.plug.resultformat(40001, err));
    //     callback($.plug.resultformat(0, "",data));
    // });
};

module.exports.useridbyname = (name, callback) =>{
    redis.get(util.format(KEY.USER_USERNAME, name),(err, data) =>{
        if (err) callback($.plug.resultformat(40001, err));
        callback($.plug.resultformat(0, "",{id:data}));
    });
};

module.exports.resetpassword = (user, callback) => {
    var code = $.plug.sms.getRandomInt(100000,999999);
    user.newpassword = code;

    var mobilesql ="select mobile from user \
              where id = '{0}'\
              ".format(user.id);
    
    $.db.mysql.gd.query(mobilesql, (err, data) => {
        if (err) return callback($.plug.resultformat(40001, err));
        var value = {
            number : data[0].mobile,
            content: "系统为您生成的登录密码为:{0}。请注意保护个人密码安全。".format(code)
        };

        if(data[0].mobile)
          $.plug.sms.send(value,(result)=> {console.log("短信发送结果:"+ result)});
     });
    
    //加密密码
    $.plug.crypto.encrypt("{0}".format(user.newpassword), $.config.cryptsalt, (maskpw)=>{
         user.newpassword = maskpw;

         var sql ="update user \
              set password = '{1}'\
              where id = '{0}'\
              ".format(user.id, user.newpassword);

        $.db.mysql.gd.query(sql, (err, data) => {
            if (err) return callback($.plug.resultformat(40001, err));
            callback($.plug.resultformat(0, ""));
         });
     });
};





