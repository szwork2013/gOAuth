$(function(){function t(t){var e="";if(0==t.aaData.length)return void(a=!0);for(var r=0;r<t.aaData.length;r++)e+='<tr class="tr-record" OrderidOrNumber="{1}">				<td>{0}</td>				<td>{1}</td>				<td>{2}</td>			</tr>'.format(t.aaData[r].SettTime.substring(0,10),t.aaData[r].Orderid,t.aaData[r].SettTotal);$("#record-content").append(e)}function e(){sessionStorage.OrderidOrNumber=$('input[name="code"]').val(),$.ajax({url:"/merchant/settLogApi",type:"get",data:{OrderidOrNumber:$('input[name="code"]').val(),PageIndex:r},success:function(e){$("#record-content").html(""),t(e)}})}var r=1,a=!1;$('input[name="code"]').val(sessionStorage.OrderidOrNumber||""),e(),$("#record-content").delegate(".tr-record","click",function(){var t=$(this).attr("OrderidOrNumber");location.href="/merchant/settlementDetail?OrderidOrNumber="+t}),$("input[name='code']").keyup(function(){e()});var n=[];$(window).scroll(function(t){a||n[r]||$(document).scrollTop()+winHeight/scale+50>=winHeight/scale&&(r++,n[r]=!0,e())})});