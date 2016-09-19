/*
**
*/
exports.get_getuser = (req, res) => {
	$.proxy.manager.fetchById(req.query,(err,data) => {
		var d = {};
		if(!data)
		{
			d = $.plug.restAPI.resultformat(9000,'no data',data,null);
		}else
		{
			d = $.plug.restAPI.resultformat(0,'',data,null);
		}
		res.send(d);
	});
};