$(function() {
	var condition = JSON.parse(sessionStorage.condition || '{}');
	condition.PageIndex = 1;
	$("input[name='code']").val(condition.Code || '');
	var conditionText = JSON.parse(sessionStorage.conditionText || '{}');
	//是否加载完成
	var isLoadAll = false;
	getData();

	//呈现结果
	function getRecord(data) {
		var text = "{0} {1}".format(conditionText.CodeName || '', conditionText.timeText || '');
		if (condition.StartTime || condition.EndTim) {
			text += " {0}至{1}".format(condition.StartTime || '', condition.EndTime || '');
		}
		sessionStorage.condition = JSON.stringify(condition);
		sessionStorage.conditionText = JSON.stringify(conditionText);
		if (text && text != " ") {
			$('.current-condition').text(text);
		} else {
			$('.current-condition').text('所有核销记录');
		}

		$('.totalNumber').text(data.TotalNumber);
		$('.totalPrice').text((data.TotalPrice || '0') + '元');
		var html = '';
		if (data.aaData.length == 0) {
			isLoadAll = true;
			return;
		}
		for (var i = 0; i < data.aaData.length; i++) {
			html += '<tr class="tr-record" code="{0}">\
				<td>{1}</td>\
				<td>{0}</td>\
				<td>{2}</td>\
				<td>{3}</td>\
			</tr>'.format(data.aaData[i].Code, data.aaData[i].Usedtime.substring(0, 10), data.aaData[i].Costprice, data.aaData[i].Title);
		}
		$('#record-content').append(html);
	}
	
	//根据条件到后台请求数据
	function getData() {
		$.ajax({
			url: '/merchant/verificationRecordApi',
			type: 'get',
			data: condition,
			success: function(res) {
				$('#record-content').html('');
				getRecord(res);
			}
		});
	}
	
	//查看详细
	$('#record-content').delegate('.tr-record', 'click', function() {
		var code = $(this).attr('code');
		location.href = '/merchant/verificationRecordDetail?code=' + code;
	});

	//按code搜索
	$("input[name='code']").keyup(function() {
		condition.Code = $(this).val();
		getData();
	});

	//筛选
	$('input[name="search"]').tap(function() {
		$('.condition-container').show();
	});

	//取消
	$('.ok').tap(function() {
		$('.condition-container').hide();
	});

	//条件菜单切换
	$('.condition .left div').tap(function(evt) {
		var self = $(evt.target);
		self.siblings().removeClass('selected');
		self.addClass('selected');
		var cls = self.data('type');
		$('.condition .right').hide();
		$('.condition .' + cls).show();
	});

	//选择条件
	$('.condition .right > div').click(function() {
		//重新搜索
		condition.PageIndex = 1;
		isLoadAll = false;
		scroll = [];

		var self = $(this);
		self.siblings().removeClass('selected');
		self.addClass('selected');
		$('.condition .right > div.selected').each(function() {
			var selected = $(this);
			var time = selected.data('time');
			var value = selected.data('value');
			if (time) {
				//自定义
				if (time == -1) {
					condition.StartTime = $('.start-date').val();
					condition.EndTime = $('.end-date').val();
					conditionText.timeText = '';
				} else {
					conditionText.timeText = selected.text();

					var month = new Date().getMonth();
					var endDate = new Date();
					endDate.setMonth(month + 1);
					endDate.setDate(0);

					var startDate = new Date();
					startDate.setMonth(month - time + 1);
					startDate.setDate(1);
					condition.StartTime = startDate.format('yyyy-MM-dd');
					condition.EndTime = endDate.format('yyyy-MM-dd');
				}
			} else {
				conditionText.timeText = '';
				condition.StartTime = '';
				condition.EndTime = '';
			}
			if (value) {
				conditionText.CodeName = selected.text();
				condition.CardType = value;
			}
			getData();
		});
	});

	//清空搜索条件
	$('.empty').tap(function() {
		condition = {};
		condition.PageIndex = 1;
		isLoadAll = false;
		scroll = [];

		$('.condition .right > div').removeClass('selected');
		$("input[name='code']").val('');
		conditionText = {};
		getData();
	});

	//取消
	$('.cancel').tap(function() {
		condition.PageIndex = 1;
		isLoadAll = false;
		scroll = [];

		$('.empty').tap()
		$('.condition-container').hide();
	});

	var scroll = [];
	$(window).scroll(function(event) {
		if (isLoadAll || scroll[condition.PageIndex]) return;
		if ($(document).scrollTop() + $(window).height() + 50 >= $(document).height()) {
			condition.PageIndex++;
			scroll[condition.PageIndex] = true;
			getData();
		}
	});

	var currYear = (new Date()).getFullYear();
	var opt = {};
	opt.date = {
		preset: 'date'
	};
	opt.default = {
		theme: 'android-ics light', //皮肤样式
		display: 'modal', //显示方式 
		mode: 'scroller', //日期选择模式
		dateFormat: 'yyyy-mm-dd',
		lang: 'zh',
		//showNow: true,
		//nowText: "今天",
		startYear: currYear - 10, //开始年份
		endYear: currYear + 10, //结束年份
		width: 190,
		height: 50
	};

	$(".start-date, .end-date").mobiscroll($.extend(opt['date'], opt['default']));

	$(".start-date, .end-date").change(function() {
		$('.user-defined').click();
	});

	$(".start-i").click(function(event) {
		$(".start-date").mobiscroll('show')
	});
	$(".end-i").click(function(event) {
		$(".end-date").mobiscroll('show')
	});
});