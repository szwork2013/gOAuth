$(function() {
	var pn = 1;
	var last = 7;
	//控制滚轮最小时间间隔
	var playing = false;
	window.touchEvent = false;

	motionEventRegister();
	motion(0);

	function motionEventRegister() {
		//滚轮
		var scrollFunc = function(e) {
			e = e || window.event;
			//firefox使用detail,向上是负数。
			if (e.detail > 0 || e.wheelDelta < 0) {
				motion(1);
			} else if (e.detail < 0 || e.wheelDelta > 0) {
				motion(-1);
			}
		};

		//添加滚轮事件
		if (document.addEventListener) {
			document.addEventListener('DOMMouseScroll', scrollFunc, false); //W3C 
		}
		window.onmousewheel = scrollFunc; //IE/Opera/Chrome/Safari 

		//按键
		document.onkeydown = function(event) {
			var event = event || window.event;
			var c = event.keyCode;
			if (c === 40 || c === 32 || c === 39) {
				motion(1);
			} else if (c === 38 || c === 37) {
				motion(-1);
			}
		};

		$('body').touchMoved(function(dx, dy) {
			motion(dy > 0 ? -1 : 1);
		});
	}

	function num(n) {
		return n == 0 ? 6 : n;
	}

	function motion(d) {
		if (playing) return;
		playing = true;
		setTimeout(function() {
			playing = false;
		}, 1000);

		$('.grey-cover, .big-img').hide();

		if (pn === 1 && d === -1) return;
		pn = pn + d;
		if (pn >= last - 1) {
			$('.next-page').hide();
		} else {
			$('.next-page').show();
		}

		//控制边界
		if (pn === 0) {
			pn = 1;
		} else if (pn >= last) {
			pn = last - 1;
			return;
		}

		function change(n, m) {
			$('#page' + n).addClass("status" + m).removeClass('status1').removeClass('status' + (2 - m));
		}

		change(num(((pn - 2) + 6) % 6), 0);
		if (d > 0) {
			//原来的页面向上运动
			change(num(pn - d), 2);
			for (var i = 1; i < d; i++) {
				change(num((pn - d + i) % 6), 2);
			}
		} else if (d < 0) {
			//原来的页面向下运动
			change(num(pn - d), 0);
			for (var i = -1; i > d; i--) {
				change(num((pn - i) % 6), 0);
			}
			change(num(pn % 6), 0);
		}
		change(num((pn + 2) % 6), 0);

		//当前页面
		$('#page' + pn).removeClass('status0').addClass('status1').removeClass('status2');
		$('.stage').removeClass(function() {
			return 'active1 active2 active3 active4 active5 active6';
		}).addClass('active' + pn);

		for (var i = 1; i <= 6; i++) {
			if (
				i === pn || i === pn - d || i === num(pn - d)
			) {
				$('#page' + i).show();
			} else {
				$('#page' + i).css("margin-top", "250%");
			}
		}

		if (d > 0) {
			//目标页面从下向上运动
			$('#page' + pn).css("margin-top", "250%");
			$('#page' + pn).animate({
				"margin-top": "0px"
			}, 300);

			//原来的页面向上运动
			$('#page' + num(pn - d)).animate({
				"margin-top": "-1160px"
			}, 300);
		} else if (d < 0) {
			//目标页面从上向下运动
			$('#page' + pn).css("margin-top", "-1160px");
			$('#page' + pn).animate({
				"margin-top": "0px"
			}, 300);

			//原来的页面向下运动
			$('#page' + (pn - d)).animate({
				"margin-top": "250%"
			}, 300);
		}

		if (typeof window['loadPage' + pn] == 'function') {
			window['loadPage' + pn]();
		}
	}
});