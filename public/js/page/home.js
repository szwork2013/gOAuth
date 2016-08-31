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
	// 是否绑定openid
	if (getQueryString("iszd") == "true") {
		sessionStorage.bangding = true;
		$("#btnGb").click(function() {
			if (getQueryString("iszd") == "true") {
				location.href = "/open/home";
			}
		});
	}
	if ($("#isopenid").val() == "false" && sessionStorage.bangding == "true") {
		delete sessionStorage.bangding;
		showAlert("warning", "openid");
	}
	var width = $('.widget-body').width();

	var titleStyle = {
		fontWeight: 'bold',
		fontSize: '15px'
	};

	var number = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

	$.ajax({
		url: '/api/hotBrandTop10',
		complete: function(XHR, TS) {
			if (!XHR || XHR.status != 200 || !XHR.responseJSON || !XHR.responseJSON.errmsg || !XHR.responseJSON.errmsg.length) {
				$('#brand-popularity').hide();
				return;
			}
			bindBrand(XHR.responseJSON.errmsg);
		}
	});

	$.ajax({
		url: '/api/personalIncome',
		complete: function(XHR, TS) {
			if (!XHR || XHR.status != 200 || !XHR.responseJSON || !XHR.responseJSON.errmsg || !XHR.responseJSON.errmsg.length) {
				$('#income').hide();
				return;
			}
			bindIncome(XHR.responseJSON.errmsg);
		}
	});

	$.ajax({
		url: '/api/tradeLineByYear',
		complete: function(XHR, TS) {
			if (!XHR || XHR.status != 200 || !XHR.responseJSON || !XHR.responseJSON.errmsg || !XHR.responseJSON.errmsg.length) {
				$('#gmv').hide();
				return;
			}
			bindGmv(XHR.responseJSON.errmsg);
		}
	});

	function bindBrand(data) {
		var chartData = [];
		for (var i = 0; i < data.length; i++) {
			chartData.push([data[i].key, parseInt(data[i].value)]);
		}
		var month = number[new Date().getMonth()];

		$('#brand-popularity').highcharts({
			chart: {
				type: 'pie',
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				marginLeft: -55
			},
			title: {
				text: '全国' + month + '月份二手车搜索热度排名前十品牌',
				style: titleStyle
			},
			subtitle: {
				text: '点击量占比',
				style: titleStyle
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
				headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
				style: {
					fontSize: "12px",
				}
			},
			plotOptions: {
				pie: {
					size: width * 0.7,
					shadow: false,
					innerSize: '60%', //饼状图的内径大小
					colors: ['#4470A7', '#AA4647', '#85A24C', '#6F528D', '#4298AD', '#DE813B', '#91A7D0', '#D19093', '#B9C994', 'grey'],
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						distance: -25, //数据标签距离饼图边缘的距离,为负数就越靠近饼图圆心
						formatter: function() {
							return this.y + '%';
						},
						style: {
							fontWeight: 'bold',
							color: 'black',
						},
						enabled: true
					},
					showInLegend: true
				}
			},
			series: [{
				type: 'pie',
				name: '占比',
				data: chartData
			}],
			legend: {
				layout: 'vertical', //图例布局: 垂直排列
				//backgroundColor: '#FFF', //图例背景色
				floating: true,
				align: 'left', //图例水平位置:左对齐
				verticalAlign: 'top', //图例框的垂直对齐方式: 顶端对齐
				x: width - 95,
				y: 145,
				itemStyle: {
					height: '40px',
					lineHeight: '40px'
				}
			},
			credits: {
				enabled: false // 禁用版权信息
			}
		});
	}

	function bindIncome(d) {
		var colors = ["#b4dac0", "#5dac7a", "#4e9c6b", "#44825a"];
		var categories = [];
		var data = [];
		var total = 0;
		for (var i = 0; i < d.length; i++) {
			categories.push(d[i].key);
			var q = {
				y: Number(d[i].value4),
				color: colors[i],
				drilldown: {
					name: d[i].key,
					categories: [],
					data: [],
					color: colors[i],
				}
			}
			for (var j = 0; j < d[i].value5.length; j++) {
				q.drilldown.categories.push(d[i].value5[j].key + '月');
				q.drilldown.data.push(Number(d[i].value5[j].value4));
			}
			data.push(q);
			total += Number(d[i].value4);
		}
		if (total == 0) {
			$('#income').hide();
			return;
		}

		var quarterData = [];
		var monthData = [];
		for (var i = 0; i < data.length; i++) {
			quarterData.push({
				name: categories[i],
				y: data[i].y,
				color: data[i].color
			});

			for (var j = 0; j < data[i].drilldown.data.length; j++) {
				var brightness = 0.1 - (j / data[i].drilldown.data.length) / 5;
				monthData.push({
					name: data[i].drilldown.categories[j],
					y: data[i].drilldown.data[j],
					color: Highcharts.Color(data[i].color).brighten(brightness).get()
				});
			}
		}

		$('#income').highcharts({
			chart: {
				type: 'pie'
			},
			title: {
				text: '个人收入构成报表',
				y: 70,
				style: titleStyle
			},
			plotOptions: {
				pie: {
					size: width * 0.7,
					shadow: false,
					center: ['50%', '50%']
				}
			},
			tooltip: {
				valueSuffix: '元'
			},
			series: [{
				name: '收入',
				data: quarterData,
				size: '65%',
				dataLabels: {
					formatter: function() {
						//return this.point.name + ',' + Math.round(this.y / total) + '%';
						return this.point.name + ',' + Math.round(this.y / total * 100) + '%';
					},
					color: '#000',
					distance: -45
				}
			}, {
				name: '收入',
				data: monthData,
				size: '67%',
				innerSize: '65%',
				dataLabels: {
					formatter: function() {
						// display only if larger than 1
						//return this.y > 1 ? '<b>' + this.point.name + ',</b> ' + this.y + ',' + Math.round(this.y / total) + '%' : null;
						return this.y > 1 ? this.point.name + ',' + Math.round(this.y / total * 100) + '%' : null;
					},
					distance: 0
				}
			}],
			credits: {
				enabled: false // 禁用版权信息
			}
		});
	}

	function bindGmv(data) {
		var categorie = [];
		var mounts = [];
		var moneys = [];
		var maxMount = 0;
		var maxMoney = 0;
		var i = 0;
		if (data.length - 6 > 0) {
			i = data.length - 6;
		}
		for (; i < data.length; i++) {
			categorie.push(data[i].key);
			var mount = Number(data[i].value);
			var money = Number(data[i].value2);
			mounts.push(mount);
			moneys.push(money);
			if (maxMount < mount) {
				maxMount = mount;
			}
			if (maxMoney < money) {
				maxMoney = money;
			}
		}
		maxMount = Math.ceil(maxMount / 100) * 100;
		maxMoney = Math.ceil(maxMoney / 100) * 100;
		//两个Y轴的刻度
		var mountAxis = [];
		var moneyAxis = [];
		for (var i = 1; i <= 10; i++) {
			mountAxis.push(maxMount * i / 10);
			moneyAxis.push(maxMoney * i / 10);
		}

		$('#gmv').highcharts({
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: new Date().getFullYear() + '年二手车交易市场走势'
			},
			xAxis: [{
				categories: categorie,
				labels: {
					step: 2,
					rotation: -20,
				}
			}],
			yAxis: [{ // Primary yAxis
				tickPositions: mountAxis,
				labels: {
					format: '{value}',
					style: {
						color: '#000'
					}
				},
				title: {
					text: '交易量(万)',
					style: {
						color: '#000'
					}
				}
			}, { // Secondary yAxis
				tickPositions: moneyAxis,
				// type: 'linear',
				title: {
					text: '交易额(亿元)',
					style: {
						color: '#000'
					}
				},
				labels: {
					format: '{value}',
					style: {
						color: '#000'
					}
				},
				opposite: true
			}],
			tooltip: {
				shared: true
			},
			/*legend: {
				layout: 'vertical',
				align: 'left',
				x: 120,
				verticalAlign: 'top',
				y: 100,
				floating: true,
				backgroundColor: '#FFFFFF'
			},*/
			series: [{
				name: '交易量',
				color: '#f19514',
				type: 'column',
				data: mounts,
				tooltip: {
					valueSuffix: '万'
				},
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '12px',
						fontFamily: 'Verdana, sans-serif',
						fontWeight: "normal",
					},
					allowOverlap: true
				}
			}, {
				name: '交易额',
				color: '#c2b66d',
				type: 'spline',
				yAxis: 1,
				data: moneys,
				tooltip: {
					valueSuffix: ' 亿元'
				},
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '12px',
						fontFamily: 'Verdana, sans-serif',
						fontWeight: "normal",
					},
					allowOverlap: true
				}
			}],
			credits: {
				enabled: false // 禁用版权信息
			}
		});
	}
};