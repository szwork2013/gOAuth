

exports.postresourceinit = (req,res)  => {
	$.proxy_rbacmg.resourceinit(req.body, (result) => {
		res.send($.plug.resultformat(0,null,{id:result}));
	});
}

exports.postresourceinit = (req,res)  => {
	$.proxy_rbacmg.resourceinit(req.body, (result) => {
		res.send($.plug.resultformat(0,null,{id:result}));
	});
}