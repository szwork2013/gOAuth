/**
 * 使用举例:
 *     "{1}{0}".format('a','b'); ==> 'ba'
 */
String.prototype.format = function() {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g,
		function(m, i) {
			return args[i];
		}
	);
};

/**
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * 例子： 
 *    (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 *    (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
 * 
 * @param {String} fmt 日期格式字符串
 */
Date.prototype.format = function(fmt) {
	var o = {
		//月份 
		"M+": this.getMonth() + 1,
		//日 
		"d+": this.getDate(),
		//小时 
		"h+": this.getHours(),
		//分 
		"m+": this.getMinutes(),
		//秒 
		"s+": this.getSeconds(),
		//季度 
		"q+": Math.floor((this.getMonth() + 3) / 3),
		//毫秒 
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$.eventPos = function(evt) {
	if (window.event && !evt) {
		evt = window.event;
	}

	if (evt.touches) {
		var touch = (evt.targetTouches || evt.changedTouches)[0];
		if (touch) {
			return {
				x: touch.pageX,
				y: touch.pageY
			};
		} else {
			return {
				x: evt.pageX,
				y: evt.pageY
			};
		}
	}

	return {
		x: evt.clientX,
		y: evt.clientY
	};
};

/*移动端点击事件*/
$.fn.tap = function(callback) {
	var $this = $(this);
	if (!callback) {
		if (this._ontap) {
			this._ontap();
		}
		return;
	}
	$this.on("touchstart", function(evt) {
		try {
			var pos1, pos = $.eventPos(evt.originalEvent);

			var moveAction = function(evt1) {
				pos1 = $.eventPos(evt1.originalEvent);
			};
			$(document.body).on("touchmove", moveAction);

			$(document.body).one("touchend", function(evt2) {
				$(document.body).off("touchmove", moveAction);
				if (pos1) {
					var dx = pos1.x - pos.x;
					var dy = pos1.y - pos.y;
					if (dx > 5 || dy > 5) {
						return;
					}
				}
				evt2.preventDefault();
				callback(evt2);
			});

		} catch (e) {
			alert(e);
		}
	});
	this._ontap = callback;
};

/*将表单序列化为json*/
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};