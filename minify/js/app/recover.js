function init(){$(".app").css("overflow","hidden"),$(".ico_eyes").click(function(){$(this).parent().hasClass("app_active")?$(this).parent().removeClass("app_active").find(".txt_password").prop("type","password"):$(this).parent().addClass("app_active").find(".txt_password").prop("type","text")});var a,e,t=60,l=function(){0==e?(window.clearInterval(a),$(".btn_vcode").addClass("btn_active"),$("input[name='vcode']").prop("placeholder","您获取的验证码"),$(".btn_vcode").text("重新发送验证码")):(e--,$(".btn_vcode").text(e+"秒后可重发"))};$(".btn_vcode").click(function(){$(this).hasClass("btn_active")&&($(".btn_vcode").removeClass("btn_active"),e=t,$(".btn_vcode").text(e+"秒后可重发"),a=window.setInterval(l,1e3),$.ajax({url:"/api/sendVerification",type:"post",data:{mobile:$("input[name='mobile']").val(),utype:"3",length:6,ttype:"1",vtype:"1"},success:function(a){a.errcode&&($("body").css("overflow","hidden"),$(".app_alert .modal-title").html("对不起！"),$(".app_alert .modal-body").html("发送验证码失败"),$(".app_alert .confirm").hide(),$("#btnGb").html("确定"),$(".app_alert").addClass("warning").show())}}))}),$validators.init({mobile:{notEmpty:{message:"* 手机号码不能为空"},regular:{reg:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,message:"* 手机号码必须合法且为11位数字"},callback:function(a){$(".btn_vcode")[a?"addClass":"removeClass"]("btn_active"),a&&$.ajax({url:"/api/checkByMobile",type:"post",data:{mobile:$("input[name='mobile']").val()},success:function(a){a.errcode||$("input[name='mobile']").parent().addClass("err").find(".lbl_err").html("* 该手机号码不存在")}})}},password:{notEmpty:{message:"* 登录密码不能为空"},stringLength:{min:6,max:20,message:"* 登录密码长度只允许输入6到20位"},regular:{reg:/^\w{6,20}$/,message:"* 登录密码只能包含数字字母下划线"}},vcode:{notEmpty:{message:"* 验证码不能为空"},regular:{reg:/^[0-9]{6}$/,message:"* 验证码必须为6位数字"}}},["mobile"]);var o=!0;$(".btn_recover").click(function(){$validators.start()&&o&&(o=!1,$.ajax({url:"/api/recover",type:"post",data:{mobile:$("input[name='mobile']").val(),password:$("input[name='password']").val(),vcode:$("input[name='vcode']").val()},success:function(a){switch(o=!0,a.errcode){case 0:sessionStorage.isrecover=!0,location.href="/open/login";break;case 400:case 401:$("body").css("overflow","hidden"),$(".app_alert .modal-title").html("对不起！"),$(".app_alert .modal-body").html("该验证码无效"),$(".app_alert .confirm").hide(),$("#btnGb").html("确定"),$(".app_alert").addClass("warning").show();break;case 403:$("body").css("overflow","hidden"),$(".app_alert .modal-title").html("对不起！"),$(".app_alert .modal-body").html("该手机号码不存在"),$(".app_alert .confirm").hide(),$("#btnGb").html("确定"),$(".app_alert").addClass("warning").show();break;case 404:$("body").css("overflow","hidden"),$(".app_alert .modal-title").html("警告！"),$(".app_alert .modal-body").html("该手机号码已被冻结"),$(".app_alert .confirm").hide(),$("#btnGb").html("确定"),$(".app_alert").addClass("warning").show();break;case 405:$("body").css("overflow","hidden"),$(".app_alert .modal-title").html("对不起！"),$(".app_alert .modal-body").html("重置失败"),$(".app_alert .confirm").hide(),$("#btnGb").html("确定"),$(".app_alert").addClass("error").show();break;case 499:$("body").css("overflow","hidden"),$(".app_alert .modal-title").html("摊上大事啦！"),$(".app_alert .modal-body").html("服务器维护中..."),$(".app_alert .confirm").hide(),$("#btnGb").html("确定"),$(".app_alert").addClass("error").show()}}}))})}