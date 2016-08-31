$(function() {
	load1();
	var marginTop = ($(window).height() - 1136) / 2 - 50 + 'px';
	$('#stage > div').css('background-position', '0 ' + marginTop);
	$('.main').css('margin-top', marginTop);

	//点击看大图
	$('.car-container img').tap(function(evt) {
		$('.grey-cover').show();
		$('.big-img .img').css('background-image', 'url("' + evt.target.src + '")');
		switchImg.setIndex($('.car-container img').index(evt.target));
		$('.big-img').show();
	});

	var pn = 0;
	var last = 6;
	//控制滚轮最小时间间隔
	var playing = false;
	window.touchEvent = false;

	motionEventRegister();
	motion(1);

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

		animation();
	}

	function animation() {
		if (pn == 1) {
			load1();
		} else {
			$('.head-content').css('clip', 'rect(0,216px,151px,216px)');
		}
	}

	function load1() {
		var i = 0;

		function clip() {
			i += 7;
			if (i > 216 + 7 + 1) {
				requestAnimFrame(function() {
					$('.head-content').css('clip', 'rect(0,{0}px,151px,{1}px)'.format(216 + i, 216 - i));
				});
				return;
			}
			$('.head-content').css('clip', 'rect(0,{0}px,151px,{1}px)'.format(216 + i, 216 - i));
			requestAnimFrame(function() {
				clip();
			});
		}
		setTimeout(function() {
			clip();
		}, 1000);
	}

	function drawline(cxt, start, end, callback) {
		var steps = Math.max(Math.abs(end[0] - start[0]), Math.abs(end[1] - start[1])) / 3;
		var deltaX = (end[0] - start[0]) / steps;
		var deltaY = (end[1] - start[1]) / steps;
		var i = 0;
		requestAnimFrame(draw);

		function draw() {
			i++;
			cxt.moveTo(start[0] + deltaX * (i - 1), start[1] + deltaY * (i - 1));
			cxt.lineTo(start[0] + deltaX * i, start[1] + deltaY * i);
			cxt.stroke();
			if (i >= steps) {
				return callback();
			}
			requestAnimFrame(draw);
		}
	}

	var arr = JSON.parse($('input[name="imgs"]').val() || '[]');
	var qnUrl = $('input[name="qnUrl"]').val();
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].Path) {
			imgs.push(qnUrl + arr[i].Path);
		}
	}
	now = imgs[0];
	$('.big-img .img').touchMoved(function(dx, dy) {
		switchImg.cube(dx > 0 ? -1 : 1);
	});
});

var now;
var imgs = [];