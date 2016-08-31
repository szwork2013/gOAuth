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

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
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

/*手指滑动事件*/
$.fn.touchMoved = function(callback) {
	var $this = $(this);
	var multi = false;
	$this.on("touchstart", function(evt) {
		multi = evt.originalEvent.touches.length > 1;

		var pos1, pos = $.eventPos(evt.originalEvent);
		$this.on("touchmove.touchMoved", function(evt1) {
			//if (!multi) {
			evt1.preventDefault();
			//}
			pos1 = $.eventPos(evt1.originalEvent);
		});

		$this.one("touchend", function(evt1) {
			if (!pos1 || multi) return;
			var dx = pos1.x - pos.x;
			var dy = pos1.y - pos.y;
			if (dx || dy) {
				callback(dx, dy, evt1.target);
			}
			$this.off("touchmove.touchMoved");
		});
		evt.stopPropagation();
	});
	return $this;
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

//使requestAnimFrame兼容各种浏览器
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

// 是否是微信打开
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
					"onMenuShareTimeline",
					"hideMenuItems",
					"showAllNonBaseMenuItem",
					"onMenuShareAppMessage"
				]
			});
			//分享接口函数
			wx.ready(function() {
				wx.showAllNonBaseMenuItem();
				// 
				wx.hideMenuItems({
					// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
					menuList: [
						'menuItem:share:facebook',
						'menuItem:share:weiboApp',
						'menuItem:share:qq',
						'menuItem:openWithQQBrowser',
						'menuItem:share:email',
						'menuItem:openWithSafari',
						'menuItem:copyUrl'
					]
				});
				// 
				wx.onMenuShareTimeline({
					// title: shareData.title,
					// link: shareData.link,
					// imgUrl: shareData.imgUrl,
					title: $('input[name=model_name]').val(),
					link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + $('input[name=appId]').val() + "&redirect_uri=http://" + $('input[name=redirect_uri]').val() + "/template/m/" + $('input[name=number]').val() + "?carid=" + $('input[name=carid]').val() + "&response_type=code&scope=snsapi_base&state=" + $('input[name=custid]').val() + "#wechat_redirect",
					//imgUrl: "http://reg.chinaccn.cn/img/logo.ico",
					imgUrl: $('input[name="first-img"]').val() || 'http://reg.chinaccn.cn/img/logo.ico',
					success: function(res) {
						$.ajax({
							url: "/api/share",
							type: "post",
							data: {
								id: $('input[name=carid]').val()
							},
							success: function(msg) {
								//
								alert('成功！');
							}
						});
					},
					cancel: function(res) {
						//
						alert('关闭！');
					},
					fail: function(res) {
						//
						alert('失败！');
					}
				});
				//
				wx.onMenuShareAppMessage({
					title: $('input[name=model_name]').val(), // 分享标题
					desc: $('input[name=remark]').val(), // 分享描述
					link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + $('input[name=appId]').val() + "&redirect_uri=http://" + $('input[name=redirect_uri]').val() + "/template/m/" + $('input[name=number]').val() + "?carid=" + $('input[name=carid]').val() + "&response_type=code&scope=snsapi_base&state=" + $('input[name=custid]').val() + "#wechat_redirect",
					//imgUrl: 'http://reg.chinaccn.cn/img/logo.ico', // 分享图标
					imgUrl: $('input[name="first-img"]').val() || 'http://reg.chinaccn.cn/img/logo.ico',
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户确认分享后执行的回调函数
						$.ajax({
							url: "/api/share",
							type: "post",
							data: {
								id: $('input[name=carid]').val()
							},
							success: function(msg) {
								//
								alert('成功！');
							}
						});
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
						alert('关闭！');
					}
				});
			});
		} else {
			alert("请使用微信打开");
		}
	}
});

var switchImg = (function() {
	var ready = true;
	var index = 0;
	var W = 640;
	var H = $(window).height();
	var $img;
	var oDiv;
	$(function() {
		$img = $(".big-img .img");
		oDiv = $img.get(0);
	});

	var fx = {
		buffer: function(obj, cur, target, fnDo, fnEnd, fs) {
			if (!fs) fs = 6;
			var now = {};
			var x = 0;
			var v = 0;

			if (!obj.__last_timer) obj.__last_timer = 0;
			var t = new Date().getTime();
			if (t - obj.__last_timer > 20) {
				fnMove();
				obj.__last_timer = t;
			}

			clearInterval(obj.timer);
			obj.timer = setInterval(fnMove, 20);

			function fnMove() {
				v = Math.ceil((100 - x) / fs);
				x += v;
				for (var i in cur) {
					now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
				}
				if (fnDo) fnDo.call(obj, now);

				if (Math.abs(v) < 1 && Math.abs(100 - x) < 1) {
					clearInterval(obj.timer);
					if (fnEnd) fnEnd.call(obj, target);
				}
			}
		},

		flex: function(obj, cur, target, fnDo, fnEnd, fs, ms) {
			var MAX_SPEED = 16;

			if (!fs) fs = 6;
			if (!ms) ms = 0.75;
			var now = {};
			var x = 0; //0-100

			if (!obj.__flex_v) obj.__flex_v = 0;

			if (!obj.__last_timer) obj.__last_timer = 0;
			var t = new Date().getTime();
			if (t - obj.__last_timer > 20) {
				fnMove();
				obj.__last_timer = t;
			}

			clearInterval(obj.timer);
			obj.timer = setInterval(fnMove, 20);

			function fnMove() {
				obj.__flex_v += (100 - x) / fs;
				obj.__flex_v *= ms;

				if (Math.abs(obj.__flex_v) > MAX_SPEED) obj.__flex_v = obj.__flex_v > 0 ? MAX_SPEED : -MAX_SPEED;

				x += obj.__flex_v;

				for (var i in cur) {
					now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
				}


				if (fnDo) fnDo.call(obj, now);

				if (Math.abs(obj.__flex_v) < 1 && Math.abs(100 - x) < 1) {
					clearInterval(obj.timer);
					if (fnEnd) fnEnd.call(obj, target);
					obj.__flex_v = 0;
				}
			}
		},
		linear: function(obj, cur, target, fnDo, fnEnd, fs) {
			if (!fs) fs = 50;
			var now = {};
			var x = 0;
			var v = 0;

			if (!obj.__last_timer) obj.__last_timer = 0;
			var t = new Date().getTime();
			if (t - obj.__last_timer > 20) {
				fnMove();
				obj.__last_timer = t;
			}

			clearInterval(obj.timer);
			obj.timer = setInterval(fnMove, 20);

			v = 100 / fs;

			function fnMove() {
				x += v;

				for (var i in cur) {
					now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
				}

				if (fnDo) fnDo.call(obj, now);

				if (Math.abs(100 - x) < 1) {
					clearInterval(obj.timer);
					if (fnEnd) fnEnd.call(obj, target);
				}
			}
		},

		stop: function(obj) {
			clearInterval(obj.timer);
		},

		move3: function(obj, json, fnEnd, fTime, sType) {
			var addEnd = fx.addEnd;

			fTime || (fTime = 1);
			sType || (sType = 'ease');

			setTimeout(function() {
				Utils.setStyle3(obj, 'transition', sprintf('%1s all %2', fTime, sType));
				addEnd(obj, function() {
					Utils.setStyle3(obj, 'transition', 'none');
					if (fnEnd) fnEnd.apply(obj, arguments);
				}, json);

				setTimeout(function() {
					if (typeof json == 'function')
						json.call(obj);
					else
						Utils.setStyle(obj, json);
				}, 0);
			}, 0);
		}
	};

	var Utils = {
		setStyle: function(obj, json) {
			if (obj.length)
				for (var i = 0; i < obj.length; i++) Utils.setStyle(obj[i], json);
			else {
				if (arguments.length == 2)
					for (var i in json) obj.style[i] = json[i];
				else
					obj.style[arguments[1]] = arguments[2];
			}
		},
		setStyle3: function(obj, name, value) {
			obj.style['Webkit' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
			obj.style['Moz' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
			obj.style['ms' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
			obj.style['O' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
			obj.style[name] = value;
		},
		rnd: function(n, m) {
			return Math.random() * (m - n) + n;
		}
	}

	var next = function(delta) {
		index = (index + delta + imgs.length) % imgs.length;
		return imgs[index];
	}

	return {
		setIndex: function(i) {
			index = i;
		},
		//爆炸
		explode: function(delta) {
			if (!ready) return;
			ready = false;

			var R = 4;
			var C = 7;
			var cw = W / 2;
			var ch = H / 2;

			oDiv.innerHTML = '';
			oDiv.style.background = 'url(' + (next(delta)) + ') center no-repeat';
			var aData = [];

			var wait = R * C;

			for (var i = 0; i < R; i++) {
				for (var j = 0, k = 0; j < C; j++, k++) {
					aData[i] = {
						left: W * j / C,
						top: H * i / R
					};
					var oNewDiv = $('<div>');
					oNewDiv.css({
						position: 'absolute',
						width: Math.ceil(W / C) + 'px',
						height: Math.ceil(H / R) + 'px',
						background: 'url(' + (now) + ') ' + -aData[i].left + 'px ' + -aData[i].top + 'px no-repeat',
						left: aData[i].left + 'px',
						top: aData[i].top + 'px'
					});


					oDiv.appendChild(oNewDiv[0]);

					var l = ((aData[i].left + W / (2 * C)) - cw) * Utils.rnd(2, 3) + cw - W / (2 * C);
					var t = ((aData[i].top + H / (2 * R)) - ch) * Utils.rnd(2, 3) + ch - H / (2 * R);

					setTimeout((function(oNewDiv, l, t) {
						return function() {
							fx.buffer(
								oNewDiv, {
									left: oNewDiv.offsetLeft,
									top: oNewDiv.offsetTop,
									opacity: 100,
									x: 0,
									y: 0,
									z: 0,
									scale: 1,
									a: 0
								}, {
									left: l,
									top: t,
									opacity: 0,
									x: Utils.rnd(-180, 180),
									y: Utils.rnd(-180, 180),
									z: Utils.rnd(-180, 180),
									scale: Utils.rnd(1.5, 3),
									a: 1
								},
								function(now) {
									this.style.left = now.left + 'px';
									this.style.top = now.top + 'px';
									this.style.opacity = now.opacity / 100;
									Utils.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateX(' + now.x + 'deg) rotateY(' + now.y + 'deg) rotateZ(' + now.z + 'deg) scale(' + now.scale + ')');
								},
								function() {
									setTimeout(function() {
										oDiv.removeChild(oNewDiv);
									}, 200);
									if (--wait == 0) {
										ready = true;
										now = next(delta);
									}
								}, 10
							);
						};
					})(oNewDiv[0], l, t), Utils.rnd(0, 200));
				}
			}
		},
		//翻转	
		tile: function(delta) {
			if (!ready) return;
			ready = false;

			var R = 3;
			var C = 6;

			var wait = R * C;

			var dw = Math.ceil(W / C);
			var dh = Math.ceil(H / R);

			oDiv.style.background = 'none';
			oDiv.innerHTML = '';

			for (var i = 0; i < C; i++) {
				for (var j = 0; j < R; j++) {
					var oNewDiv = document.createElement('div');
					var t = Math.ceil(H * j / R);
					var l = Math.ceil(W * i / C);

					Utils.setStyle(oNewDiv, {
						position: 'absolute',
						background: 'url(' + (now) + ') ' + -l + 'px ' + -t + 'px no-repeat',
						left: l + 'px',
						top: t + 'px',
						width: dw + 'px',
						height: dh + 'px'
					});

					(function(oNewDiv, l, t) {
						oNewDiv.ch = false;

						setTimeout(function() {
							fx.linear(oNewDiv, {
								y: 0
							}, {
								y: 180
							}, function(now) {
								if (now.y > 90 && !oNewDiv.ch) {
									oNewDiv.ch = true;
									oNewDiv.style.background = 'url(' + (next(delta)) + ') ' + -l + 'px ' + -t + 'px no-repeat';
								}

								if (now.y > 90) {
									Utils.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY(' + now.y + 'deg) scale(-1,1)');
								} else {
									Utils.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY(' + now.y + 'deg)');
								}
							}, function() {
								if ((--wait) == 0) {
									ready = true;
									now = next(delta);
								}
							}, 22);
						}, /*(i+j*R)*120*/ (i + j) * 200);
					})(oNewDiv, l, t);

					oDiv.appendChild(oNewDiv);
				}
			}
		},
		//扭曲
		bars: function(delta) {
			if (!ready) return;
			ready = false;
			var C = 7;

			var wait = C;

			var dw = Math.ceil(W / C);

			oDiv.style.background = 'none';
			oDiv.innerHTML = '';

			for (var i = 0; i < C; i++) {
				var oNewDiv = document.createElement('div');

				Utils.setStyle(oNewDiv, {
					width: dw + 'px',
					height: '100%',
					position: 'absolute',
					left: W * i / C + 'px',
					top: 0
				});
				Utils.setStyle3(oNewDiv, 'transformStyle', 'preserve-3d');
				Utils.setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateX(0deg)');
				//setStyle3(oNewDiv, 'transition', '0.5s all linear');

				(function(oNewDiv, i) {
					oNewDiv.style.zIndex = C / 2 - Math.abs(i - C / 2);

					setTimeout(function() {
						fx.buffer(oNewDiv, {
							a: 0,
							x: 0
						}, {
							a: 100,
							x: -90
						}, function(now) {
							Utils.setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY(' + ((3 * (i - C / 2)) * (50 - Math.abs(now.a - 50)) / 50) + 'deg) rotateX(' + now.x + 'deg)');
						}, function() {
							if (--wait == 0) {
								ready = true;
							}
							now = next(delta);
						}, 8);
						//setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY('+3*(i-C/2)+'deg) rotateX(-45deg)');
					}, (i + 1) * 130);
				})(oNewDiv, i);

				oNewDiv.innerHTML = '<div></div><div></div><div></div><div></div>';

				var oNext = oNewDiv.getElementsByTagName('div')[0];
				var oNow = oNewDiv.getElementsByTagName('div')[1];
				var oBack = oNewDiv.getElementsByTagName('div')[2];
				var oBack2 = oNewDiv.getElementsByTagName('div')[3];

				Utils.setStyle([oNext, oNow, oBack, oBack2], {
					width: '100%',
					height: '100%',
					position: 'absolute',
					left: 0,
					top: 0
				});
				Utils.setStyle(oNext, {
					background: 'url(' + (next(delta)) + ') ' + -W * i / C + 'px 0px no-repeat'
				});
				Utils.setStyle3(oNext, 'transform', 'scale3d(0.836,0.836,0.836) rotateX(90deg) translateZ(' + H / 2 + 'px)');

				Utils.setStyle(oNow, {
					background: 'url(' + (now) + ') ' + -W * i / C + 'px 0px no-repeat'
				});
				Utils.setStyle3(oNow, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ(' + H / 2 + 'px)');

				Utils.setStyle(oBack, {
					background: '#666'
				});
				Utils.setStyle3(oBack, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ(-' + H / 2 + 'px)');

				Utils.setStyle(oBack2, {
					background: '#666'
				});
				Utils.setStyle3(oBack2, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(90deg) translateZ(-' + H / 2 + 'px)');

				oDiv.appendChild(oNewDiv);
			}
		},
		//立方体
		cube: function(delta) {
			if (!ready) return;
			ready = false;

			oDiv.innerHTML = '';
			oDiv.style.background = 'none';

			Utils.setStyle3(oDiv, 'transformStyle', 'preserve-3d');
			Utils.setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY(0deg)');

			var oNow = document.createElement('div');
			var oNext = document.createElement('div');

			Utils.setStyle([oNow, oNext], {
				position: 'absolute',
				width: '100%',
				height: '100%',
				left: 0,
				top: 0
			});

			Utils.setStyle3(oNow, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,0deg) translate3d(0,0,{0}px)'.format(W / 2));
			Utils.setStyle3(oNext, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,{0}deg) translate3d(0,0,{1}px)'.format(delta > 0 ? 90 : -90, W / 2));

			oDiv.appendChild(oNext);
			oDiv.appendChild(oNow);

			oNow.style.background = 'url(' + (now) + ') center no-repeat';
			var nt = next(delta);
			oNext.style.background = 'url(' + nt + ') center no-repeat';
			setTimeout(function() {
				fx.flex(oDiv, {
					y: 0
				}, {
					y: (delta > 0 ? -90 : 90)
				}, function(now) {
					Utils.setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY(' + now.y + 'deg)');
				}, function() {
					Utils.setStyle3(oDiv, 'transition', 'none');
					Utils.setStyle3(oDiv, 'transformStyle', 'flat');
					Utils.setStyle3(oDiv, 'transform', 'none');

					oDiv.innerHTML = '';
					oDiv.style.background = 'url(' + nt + ') center no-repeat';

					now = nt;

					ready = true;
				}, 10, 0.6);
			}, 0);
		},
		//翻页
		turn: function(delta) {
			if (!ready) return;
			ready = false;

			oDiv.innerHTML = '';
			oDiv.style.background = 'url(' + (next(delta)) + ') center no-repeat';

			var oDivPage = document.createElement('div');

			Utils.setStyle(oDivPage, {
				position: 'absolute',
				background: 'url(' + (now) + ') right no-repeat',
				zIndex: 3,
				left: '50%',
				top: 0,
				width: '50%',
				height: '100%',
				overflow: 'hidden'
			});
			Utils.setStyle3(oDivPage, 'transform', 'perspective(1000px) rotateY(0deg)');
			Utils.setStyle3(oDivPage, 'transformOrigin', 'left');

			oDiv.appendChild(oDivPage);

			var oDivOld = document.createElement('div');

			Utils.setStyle(oDivOld, {
				position: 'absolute',
				left: 0,
				top: 0,
				width: '50%',
				height: '100%',
				zIndex: 2,
				background: 'url(' + (now) + ') left no-repeat'
			});

			oDiv.appendChild(oDivOld);
			var oDivShadow = document.createElement('div');

			Utils.setStyle(oDivShadow, {
				position: 'absolute',
				right: 0,
				top: 0,
				width: '50%',
				height: '100%',
				zIndex: 2,
				background: 'rgba(0,0,0,1)'
			});

			oDiv.appendChild(oDivShadow);

			oDivPage.ch = false;
			fx.buffer(oDivPage, {
				y: 0,
				opacity: 1
			}, {
				y: -180,
				opacity: 0
			}, function(now) {
				if (now.y < -90 && !oDivPage.ch) {
					oDivPage.ch = true;
					oDivPage.innerHTML = '<img />';

					var oImg = oDivPage.getElementsByTagName('img')[0];

					oImg.src = (next(delta));
					Utils.setStyle3(oImg, 'transform', 'scaleX(-1)');

					Utils.setStyle(oImg, {
						position: 'absolute',
						right: 0,
						top: 0,
						width: '200%',
						height: '100%'
					});

					//setStyle3(oDivPage, 'transform', 'perspective(1000px) scale(-1,1) rotateY(-90deg)');
					Utils.setStyle3(oDivPage, 'transformOrigin', 'left');
				}

				if (now.y < -90) {
					Utils.setStyle3(oDivPage, 'transform', 'perspective(1000px) scale(-1,1) rotateY(' + (180 - now.y) + 'deg)');
				} else {
					Utils.setStyle3(oDivPage, 'transform', 'perspective(1000px) rotateY(' + now.y + 'deg)');
				}
				oDivShadow.style.background = 'rgba(0,0,0,' + now.opacity + ')';
			}, function() {
				now = next(delta);
				ready = true;
			}, 14);
		}
	}
})();

$(function() {
	//关闭大图
	$('.grey-cover, .big-img .img').tap(function() {
		$('.grey-cover, .big-img').hide();
	});

	$('.nav-pre').tap(function() {
		switchImg.cube(-1);
	});
	$('.nav-next').tap(function() {
		switchImg.cube(1);
	});
});