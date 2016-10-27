exports.getdecrypt = (req,res)  => {
	$.proxy_common.securitymg.decrypt({msg:req.query.mskpsw}, (result) => {
		res.send(result);
	});
}