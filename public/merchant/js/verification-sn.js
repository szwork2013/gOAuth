$.ajax({
	url: "/api/wechatCertification",
	type: "get",
	data: {
		url: location.href
	},
	success: function(data) {
		if (wx) {
			// 配置
			wx.config({
				//必须传入，不然没办法调未正式发布的jsapi
				beta: false,
				debug: false,
				appId: $('input[name=appId]').val(),
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: [
					'scanQRCode'
				]
			});
			$('.scan-qr .confirm').tap(function() {
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						$('input[name="no"]').val(result);
						query();
					}
				});
			});
		} else {
			alert("请使用微信打开");
		}
	}
});

var invalidTitle = ['此券无效!', '非本店礼券'];
var invalidDesc = ['请检查券号是否输入有误或此券可能已过期', '请在相应门店使用'];

function query() {
	var no = $('input[name="no"]').val();
	if (!no || no.length < 12) {
		$('.invalidTitle').text(invalidTitle[0]);
		$('.invalidDesc').text(invalidDesc[0]);
		return $('.invalid').show();
	}
	location.href = "/merchant/verificationCheck" + "?no=" + no;
}

$(function() {
	if (getQueryString('isEnabled') == '0') {
		$('.invalidTitle').text(invalidTitle[0]);
		$('.invalidDesc').text(invalidDesc[0]);
		$('.invalid').show();
	} else if (getQueryString('isEnabled') == '2') {
		$('.invalidTitle').text(invalidTitle[1]);
		$('.invalidDesc').text(invalidDesc[1]);
		$('.invalid').show();
	}

	$('.btn[name="query"]').tap(query);

	$('.close').tap(function() {
		$('.invalid').hide();
	});
});