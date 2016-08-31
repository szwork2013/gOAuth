function init() {
	// 定高
	$(".charts-body").height($("#page-body").height() - 243);
	// 全城搜车条件清理指令
	delete sessionStorage.choose_year;
	delete sessionStorage.choose_interval;
	delete sessionStorage.BrandName_text;
	delete sessionStorage.BrandName_value;
	delete sessionStorage.SeriesName_text;
	delete sessionStorage.SeriesName_value;
	
	var img = new Image(); 
	img.src = "../img/app/luopan.png"; 
	img.onload = function() {
		// 雷达
		$(".ldzzimg, .ldkdimg")
		.height($(".ldimg").height() / 125 * $(".ldkdimg").height() * 0.9)
		.css({
			left: $(".ldimg").height() / 125 * 5,
			top: $(".ldimg").height() / 125 * 10
		});
	};
	
	var width = $('.widget-body').width();

	var titleStyle = {
		fontWeight: 'bold',
		fontSize: '15px'
	};

	var number = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
};