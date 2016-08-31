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
