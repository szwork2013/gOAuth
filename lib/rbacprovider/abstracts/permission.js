var
    async = require('async'),
    //user = require('user'),
    //authorization = require('./authorization/'),
    //response = require('./../util/response.js'),
    error = require('./../error');

module.exports = function(req, res, next) {
    var userId,
        userName;

    async.waterfall([
        //获取用户基本信息
        function(cb) {
            // if (!req.query.redirect_uri)
            //     return cb(new error.invalidRequest('RedirectUri is mandatory for authorization endpoint'));
			
            // redirectUri = req.query.redirect_uri;
            cb();
        },
        //获取用户角色
        function(cb) {
            // switch (responseType) {
            //     case 'code':
            //         grantType = 'authorization_code';
            //         break;
            //     case 'token':
            //         grantType = 'implicit';
            //         break;
            //     default:
            //         return cb(new error.unsupportedResponseType('Unknown response_type parameter passed'))
            //         break;
            // }
            
            cb();
        },
        //获取角色相应权限
        function(cb) {
            // if (!req.oauth2.model.client.getRedirectUri(client))
            //     cb(new error.unsupportedResponseType('RedirectUri is not set for the client'));
            // else if (req.oauth2.model.client.getRedirectUri(client) != redirectUri)
            //     cb(new error.invalidRequest('Wrong RedirectUri provided'));
            // else {
            //     req.oauth2.logger.debug('RedirectUri check passed: ', redirectUri);
            //     cb();
            // }
            cb();
        },
        //获取角色相应权限
        function(cb) {
            // if (!req.oauth2.model.client.getRedirectUri(client))
            //     cb(new error.unsupportedResponseType('RedirectUri is not set for the client'));
            // else if (req.oauth2.model.client.getRedirectUri(client) != redirectUri)
            //     cb(new error.invalidRequest('Wrong RedirectUri provided'));
            // else {
            //     req.oauth2.logger.debug('RedirectUri check passed: ', redirectUri);
            //     cb();
            // }
            cb();
        },
    ],
    function(err) {
        // if (err) response.error(req, res, err, redirectUri);
        // else {
        //     if (req.method == 'GET')
        //         req.oauth2.decision(req, res, client, scope, user, redirectUri);
        //     else if (grantType == 'authorization_code')
        //         authorization.code(req, res, client, scope, user, redirectUri);
        //     else if (grantType == 'implicit')
        //         authorization.implicit(req, res, client, scope, user, redirectUri);
        //     else
        //         response.error(req, res, new error.invalidRequest('Wrong request method'), redirectUri);
        // }
    });
};