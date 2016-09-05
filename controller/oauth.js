/***
* Controller for oauth2.0
***/
var oauth20 = $.oauthserver.oauth20($.config.oauth_store_type);

// Define OAuth2 Token Endpoint 
exports.posttoken = (req, res) => {
	oauth20.controller.token(req,res);
};

//todo test Define OAuth2 Authorization Endpoint
exports.getauthorization = (req, res) => {
	oauth20.controller.authorization(req,res);
};
//todo test
exports.posauthorization = (req, res) => {
	oauth20.controller.authorization(req,res);
};