/* 选择弹出框 */
function showAlert(show_alert, page_type) {
	// 选择弹窗口类型
	(function($modal) {
		$("#alert-" + show_alert).click();
		$modal.find(".modal-title").text(page_type);
		$modal.find(".modal-body").text("");
	})($("#modal-" + show_alert).prop("aria-hidden", "false"));
}

$(function() {
	//设置背景
	$('body').css('background-position', '0 {0}px'.format(($('body').height() - 1136) / 2));

	//用户已登录不用再输入密码
	var shopcode = $('input[name="shopcode"]').val();
	if (shopcode) {
		$('input[name="password"]').val('tv3o8imc4');
	}

	$('.clear-div').tap(function() {
		$('input[name="password"]').val('');
		$('.clear-div').hide();
	});

	function showClear() {
		if ($('input[name="password"]').val()) {
			$('.clear-div').show();
		} else {
			$('.clear-div').hide();
		}
	}
	showClear();
	$('input[name="password"]').keyup(showClear);

	// 存储openid
	sessionStorage.openid = $("input[name='openid']").val();
	// 登录验证
	$('#loginForm').bootstrapValidator({
		fields: {
			username: {
				validators: {
					notEmpty: {
						message: '* 手机号不能为空'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: '* 密码不能为空'
					}
				}
			}
		},
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		//已经登录了
		if ($('input[name="shopcode"]').val() == $('input[name="username"]').val() && $('input[name="password"]').val() == 'tv3o8imc4') {
			return location.href = '/merchant/verificationSn';
		}
		$.post('/merchant/checkLogin', $('#loginForm').serializeObject(), function(data) {
			if (!data) {
				return showAlert("warning", "登录失败");
			}
			if (data.errcode || data.errcode != '0') {
				return showAlert("warning", data.errmsg);
			}
			location.href = "/merchant/verificationSn";
		});
	});
});