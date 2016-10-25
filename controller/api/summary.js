
exports.postpageviewsummary = (req, res)  => {
	var data = [
		{
			url:"/company/companyDetail?id=187&modelType=1",
			count:5
		},
		{
			url:"/company/companyDetail?id=154&modelType=1",
			count:6
		},
		,
		{
			url:"/company/companyDetail?id=152&modelType=1",
			count:7111
		}
	];
	res.send($.plug.resultformat(0, '', data));
}

exports.getcustsummary = (req,res)  => {
	var date = new Date().format("yyyy-MM-dd");
	if(req.query.date){
		date = req.query.date;
	}
	
	$.proxy_custmg.custcenter.custsummary(date, (result)=>{
		res.send(result);
	});
}