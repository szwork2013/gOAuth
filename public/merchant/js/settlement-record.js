$(function() {
	var PageIndex = 1;
	//是否加载完所有数据
	var isLoadAll = false;
	$('input[name="code"]').val(sessionStorage.OrderidOrNumber || '');
	getData();

	//呈现结果
	function getRecord(data) {
		var html = '';
		if (data.aaData.length == 0) {
			isLoadAll = true;
			return;
		}
		for (var i = 0; i < data.aaData.length; i++) {
			html += '<tr class="tr-record" OrderidOrNumber="{1}">\
				<td>{0}</td>\
				<td>{1}</td>\
				<td>{2}</td>\
			</tr>'.format(data.aaData[i].SettTime.substring(0, 10), data.aaData[i].Orderid, data.aaData[i].SettTotal);
		}
		$('#record-content').append(html);
	}

	//根据条件到后台请求数据
	function getData() {
		sessionStorage.OrderidOrNumber = $('input[name="code"]').val();
		$.ajax({
			url: '/merchant/settLogApi',
			type: 'get',
			data: {
				'OrderidOrNumber': $('input[name="code"]').val(),
				'PageIndex': PageIndex
			},
			success: function(res) {
				$('#record-content').html('');
				getRecord(res);
			}
		});
	}

	$('#record-content').delegate('.tr-record', 'click', function() {
		var code = $(this).attr('OrderidOrNumber');
		location.href = '/merchant/settlementDetail?OrderidOrNumber=' + code;
	});

	//按单号搜索
	$("input[name='code']").keyup(function() {
		getData();
	});

	var scroll = [];
	$(window).scroll(function(event) {
		if (isLoadAll || scroll[PageIndex]) return;
		if ($(document).scrollTop() + $(window).height() + 50 >= $(document).height()) {
			PageIndex++;
			scroll[PageIndex] = true;
			getData();
		}
	});
});