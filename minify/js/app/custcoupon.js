function init(){$(".app_bottom, .app_screening").height(winHeight/scale-217+("2"==$("#status").val()?110:0)),$(".header_position div[class^='header_btn_']").click(function(){$(".header_position div[class^='header_btn_']").map(function(e,s){$(s).removeClass("active")}),$(this).addClass("active")}),$(".app_body .body_left").click(function(){$(".app_body .body_middle").css({color:"#000"}),$(".app_body .body_middle i").css({color:"#c0c0c0"}).removeClass("fa-caret-up").addClass("fa-caret-down"),$(".app_screening, .screening_dq").hide(),"none"==$(".app_screening .screening_ul").css("display")?($(".app_body .body_left").css({color:"#009aff"}),$(".app_body .body_left i").css({color:"#009aff"}).removeClass("fa-caret-down").addClass("fa-caret-up"),$(".app_screening, .screening_ul").show()):($(".app_body .body_left").css({color:"#000"}),$(".app_body .body_left i").css({color:"#c0c0c0"}).removeClass("fa-caret-up").addClass("fa-caret-down"),$(".app_screening, .screening_ul").hide())}),getQueryString("cardtype")||delete sessionStorage.cardtype,$(".app_body .body_left span").html(sessionStorage.cardtype?"不限"==sessionStorage.cardtype?"不限":sessionStorage.cardtype:"卡劵类型"),$(".app_screening .screening_ul .screening_ul_li").click(function(){sessionStorage.cardtype=$(this).attr("text"),window.location.href=setQueStr(window.location.href,"cardtype",$(this).attr("value"))}),$(".app_body .body_middle").click(function(){$(".app_body .body_left").css({color:"#000"}),$(".app_body .body_left i").css({color:"#c0c0c0"}).removeClass("fa-caret-up").addClass("fa-caret-down"),$(".app_screening, .screening_ul").hide(),"none"==$(".app_screening .screening_dq").css("display")?($(".app_body .body_middle").css({color:"#009aff"}),$(".app_body .body_middle i").css({color:"#009aff"}).removeClass("fa-caret-down").addClass("fa-caret-up"),$(".app_screening, .screening_dq").show()):($(".app_body .body_middle").css({color:"#000"}),$(".app_body .body_middle i").css({color:"#c0c0c0"}).removeClass("fa-caret-up").addClass("fa-caret-down"),$(".app_screening, .screening_dq").hide())}),getQueryString("shopid")||"2"!=$("#status").val()||(delete sessionStorage.shop,delete sessionStorage.area,delete sessionStorage.city),$(".app_body .body_middle div").html(sessionStorage.shop&&"不限"!=sessionStorage.shop?sessionStorage.shop:sessionStorage.area&&"不限"!=sessionStorage.area?sessionStorage.area:sessionStorage.city||"地区/门店"),$(".screening_dq_body_left .screening_dq_li").click(function(){$(".screening_dq_body_middle").show(),$(".screening_dq_body_left .screening_dq_li").css("color","#000"),$(this).css("color","#009aff"),sessionStorage.city=$(this).attr("text"),$.ajax({url:"/api/shopAreaByCityid?cityid="+$(this).attr("value"),type:"get",success:function(e){if(!e.errcode){$(".screening_dq_body_middle").html(""),e.errmsg.unshift("");for(var s=0;s<e.errmsg.length;s++)$(".screening_dq_body_middle").append($("<div></div>").addClass("screening_dq_li").attr("value",e.errmsg[s]).attr("text",e.errmsg[s]||"不限").append($("<div></div>").addClass("dq_li_text").html(e.errmsg[s]||"不限").append($("<i></i>").addClass("fa fa-angle-right"))));$(".screening_dq_body_middle .screening_dq_li").click(function(){$(".screening_dq_body_right").show(),$(".screening_dq_body_middle .screening_dq_li").css("color","#000"),$(this).css("color","#009aff"),sessionStorage.area=$(this).attr("text"),"不限"!=$(this).attr("text")?$.ajax({url:"/api/shopByArea?areaid="+$(this).attr("value"),type:"get",success:function(e){if(!e.errcode){$(".screening_dq_body_right").html(""),e.errmsg.unshift({Value:"",Text:"不限"});for(var s=0;s<e.errmsg.length;s++)$(".screening_dq_body_right").append($("<div></div>").addClass("screening_dq_li").attr("value",e.errmsg[s].Value).attr("text",e.errmsg[s].Text).append($("<div></div>").addClass("dq_li_text").html(e.errmsg[s].Text)));$(".screening_dq_body_right .screening_dq_li").click(function(){$(".screening_dq_body_right .screening_dq_li").css("color","#000"),$(this).css("color","#009aff"),sessionStorage.shop=$(this).attr("text"),window.location.href=setQueStr(window.location.href,"shopid",$(this).attr("value"))})}}}):($(".screening_dq_body_right .screening_dq_li").css("color","#000"),$(this).css("color","#009aff"),sessionStorage.shop=$(this).attr("text"),window.location.href=setQueStr(window.location.href,"shopid",$(this).attr("value")))})}}})}),function(e){$("input[name='isexpire']").val(e),1==e?$(".app_body .body_right i").removeClass("fa-square-o").addClass("fa-check-square-o"):$(".app_body .body_right i").removeClass("fa-check-square-o").addClass("fa-square-o")}(getQueryString("IsExpire")),$(".app_body .body_right").click(function(){1==$("input[name='isexpire']").val()?($("input[name='isexpire']").val(0),window.location.href=setQueStr(window.location.href,"IsExpire",0),$(this).find("i").removeClass("fa-check-square-o").addClass("fa-square-o")):($("input[name='isexpire']").val(1),window.location.href=setQueStr(window.location.href,"IsExpire",1),$(this).find("i").removeClass("fa-square-o").addClass("fa-check-square-o"))})}