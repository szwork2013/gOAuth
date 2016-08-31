$(function() {
	setTimeout(function() {
		$('.img-container > div').css({
			'animation-name': 'none'
		});
	}, 3000);

	//点击看大图
	$('.img-container .car').tap(function(evt) {
		$('.grey-cover').show();
		$('.big-img .img').css('background-image', 'url("' + evt.target.src + '")');
		switchImg.setIndex($('.img-container .car').index(evt.target));
		$('.big-img').show();
	});

	var myShakeEvent = new Shake({
		threshold: 0.25
	});

	myShakeEvent.start();

	window.addEventListener('shake', shakeEventDidOccur, false);

	var runing;

	function shakeEventDidOccur() {
		if (runing) return;
		runing = true;
		$('.img-container > div').css({
			'animation-name': 'swing'
		});
		setTimeout(function() {
			runing = false;
			$('.img-container > div').css({
				'animation-name': 'none'
			});
		}, 2000);
	}

	var arr = JSON.parse($('input[name="car"]').val() || '[]');
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