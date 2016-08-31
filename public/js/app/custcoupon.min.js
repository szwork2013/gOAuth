/**
* 加载入口
***/
function init() {
	// 页面布局定位
	$(".app_bottom, .app_screening").height(document.documentElement.clientHeight - 217 + ($("#status").val() == "2" ? 110 : 0));
	// 单选按钮组件
	$(".header_position div[class^='header_btn_']").click(function() {
		// 取消选择
		$(".header_position div[class^='header_btn_']").map(function(i, n) {
			$(n).removeClass("active");
		});
		// 设置选择
		$(this).addClass("active");
	});
	// 选择卡劵类型
	$(".app_body .body_left").click(function() {
		$(".app_body .body_middle").css({ color: '#000' });
		$(".app_body .body_middle i")
			.css({ color: '#c0c0c0' })
			.removeClass("fa-caret-up")
			.addClass("fa-caret-down");
		$(".app_screening, .screening_dq").hide();
		if ($(".app_screening .screening_ul").css("display") == "none") {
			$(".app_body .body_left").css({ color: '#009aff' });
			$(".app_body .body_left i")
				.css({ color: '#009aff' })
				.removeClass("fa-caret-down")
				.addClass("fa-caret-up");
			$(".app_screening, .screening_ul").show();
		} else {
			$(".app_body .body_left").css({ color: '#000' });
			$(".app_body .body_left i")
				.css({ color: '#c0c0c0' })
				.removeClass("fa-caret-up")
				.addClass("fa-caret-down");
			$(".app_screening, .screening_ul").hide();
		}
	});
	// 选择类型触发
	if (!getQueryString("cardtype")) {
		delete sessionStorage.cardtype;
	}
	$(".app_body .body_left span").html(sessionStorage.cardtype ? (sessionStorage.cardtype == "不限" ? "不限" : sessionStorage.cardtype) : "卡劵类型");
	$(".app_screening .screening_ul .screening_ul_li").click(function() {
		sessionStorage.cardtype = $(this).attr("text");
		window.location.href = setQueStr(window.location.href, "cardtype", $(this).attr("value"));
	});
	// 选择地区门店
	$(".app_body .body_middle").click(function() {
		$(".app_body .body_left").css({ color: '#000' });
		$(".app_body .body_left i")
			.css({ color: '#c0c0c0' })
			.removeClass("fa-caret-up")
			.addClass("fa-caret-down");
		$(".app_screening, .screening_ul").hide();
		if ($(".app_screening .screening_dq").css("display") == "none") {
			$(".app_body .body_middle").css({ color: '#009aff' });
			$(".app_body .body_middle i")
				.css({ color: '#009aff' })
				.removeClass("fa-caret-down")
				.addClass("fa-caret-up");
			$(".app_screening, .screening_dq").show();
		} else {
			$(".app_body .body_middle").css({ color: '#000' });
			$(".app_body .body_middle i")
				.css({ color: '#c0c0c0' })
				.removeClass("fa-caret-up")
				.addClass("fa-caret-down");
			$(".app_screening, .screening_dq").hide();
		}
	});
	// 选择城市
	if (!getQueryString("shopid") && $("#status").val() == "2") {
		delete sessionStorage.shop;
		delete sessionStorage.area;
		delete sessionStorage.city;
	}
	$(".app_body .body_middle div").html(sessionStorage.shop && sessionStorage.shop != "不限" ? sessionStorage.shop : (
		sessionStorage.area && sessionStorage.area != "不限" ? sessionStorage.area : (
			sessionStorage.city || "地区/门店"
		)
	));
	$(".screening_dq_body_left .screening_dq_li").click(function() {
		// 显示区域
		$(".screening_dq_body_middle").show();
		$(".screening_dq_body_left .screening_dq_li").css("color", "#000");
		$(this).css("color", "#009aff");
		sessionStorage.city = $(this).attr("text");
		// 请求区域
		$.ajax({
			url: "/api/shopAreaByCityid?cityid=" + $(this).attr("value"),
			type: "get",
			success: function(msg) {
				if (!msg.errcode) {
					$(".screening_dq_body_middle").html("");
					msg.errmsg.unshift('');
					for (var i=0; i < msg.errmsg.length; i++) {
						$(".screening_dq_body_middle").append(
							$("<div></div>")
							.addClass("screening_dq_li")
							.attr("value", msg.errmsg[i])
							.attr("text", msg.errmsg[i] || '不限')
							.append(
								$("<div></div>")
								.addClass("dq_li_text")
								.html(msg.errmsg[i] || '不限')
								.append(
									$("<i></i>").addClass("fa fa-angle-right")
								)
							)
						);
					}
					// 选择区域
					$(".screening_dq_body_middle .screening_dq_li").click(function() {
						// 显示店铺
						$(".screening_dq_body_right").show();
						$(".screening_dq_body_middle .screening_dq_li").css("color", "#000");
						$(this).css("color", "#009aff");
						sessionStorage.area = $(this).attr("text");
						if ($(this).attr("text") != "不限") {
							// 请求店铺
							$.ajax({
								url: "/api/shopByArea?areaid=" + $(this).attr("value"),
								type: "get",
								success: function(msg) {
									if (!msg.errcode) {
										$(".screening_dq_body_right").html("");
										msg.errmsg.unshift({ Value: '', Text: '不限' });
										for (var i=0; i < msg.errmsg.length; i++) {
											$(".screening_dq_body_right").append(
												$("<div></div>")
												.addClass("screening_dq_li")
												.attr("value", msg.errmsg[i].Value)
												.attr("text", msg.errmsg[i].Text)
												.append(
													$("<div></div>")
													.addClass("dq_li_text")
													.html(msg.errmsg[i].Text)
												)
											);
										}
										// 选择店铺
										$(".screening_dq_body_right .screening_dq_li").click(function() {
											$(".screening_dq_body_right .screening_dq_li").css("color", "#000");
											$(this).css("color", "#009aff");
											sessionStorage.shop = $(this).attr("text");
											window.location.href = setQueStr(window.location.href, "shopid", $(this).attr("value"));
										});
									}
								}
							});
						} else {
							$(".screening_dq_body_right .screening_dq_li").css("color", "#000");
							$(this).css("color", "#009aff");
							sessionStorage.shop = $(this).attr("text");
							window.location.href = setQueStr(window.location.href, "shopid", $(this).attr("value"));
						}
					});
				}
			}
		});
	});
	// 选择即将过期
	(function (isexpire) {
		$("input[name='isexpire']").val(isexpire);
		if (isexpire == 1) {
			$(".app_body .body_right i").removeClass("fa-square-o").addClass("fa-check-square-o");
		} else {
			$(".app_body .body_right i").removeClass("fa-check-square-o").addClass("fa-square-o");
		}
	})(getQueryString("IsExpire"));
	$(".app_body .body_right").click(function() {
		// 是否选中
		if ($("input[name='isexpire']").val() == 1) {
			$("input[name='isexpire']").val(0);
			window.location.href = setQueStr(window.location.href, "IsExpire", 0);
			$(this).find("i").removeClass("fa-check-square-o").addClass("fa-square-o");
		} else {
			$("input[name='isexpire']").val(1);
			window.location.href = setQueStr(window.location.href, "IsExpire", 1);
			$(this).find("i").removeClass("fa-square-o").addClass("fa-check-square-o");
		}
		
	});
}