window.loadPage4 = function() {
	var color = $('input[name=color]').val()[0];
	var colors = ['黑', '灰', '白', '红', '蓝', '绿', '黄', '紫'];
	var cs = ['white', 'grey', 'white', 'red', 'blue', 'green', 'yellow', 'purple'];

	var colorText = $('#page4 .color-letter:contains("' + color + '")');
	var index = colors.indexOf(color);
	index = index == -1 ? 9 : index;
	var c = cs[index];
	if (colorText.length) {
		colorText.addClass('selected');
		colorText.css('color', c);
		$('.color-text').css('color', c);
	} else {
		$('#page4 .color-letter:contains("其他")').addClass('selected');
	}

	var colorRotate = 22 * index - 88;

	$('.color-container .pointer').css('transform', 'rotate(' + colorRotate + 'deg)');

	var mileage = Number($('input[name=mileage]').val());
	var mileages = [1, 2, 3, 4, 5, 10, 15];
	index = mileages.indexOf(mileage);
	if (mileage > 5 && mileage < 10) {
		index = 4 + (mileage - 5) / 5;
	} else if (mileage > 10 && mileage < 15) {
		index = 5 + (mileage - 10) / 10;
	} else if (mileage > 15) {
		index = 7;
	}
	var mileageRotate = 30 * index - 90;

	$('#page4 .mileage-container .letter:eq(' + index + ')').addClass('selected');
	$('.mileage-container .pointer').css('transform', 'rotate(' + mileageRotate + 'deg)');

	var year = new Date().getFullYear();
	var years = [];
	for (var i = -1; i < 4; i++) {
		years.push(year + i);
	}

	var annual = $('input[name=annual]').val().substr(0, 4);
	index = years.indexOf(Number(annual));
	if (annual < years[0]) {
		index = -1;
	} else if (annual > years[4]) {
		index = 5;
	}
	var annualRotate = 45 * index - 90;

	if (index != -1) {
		$('#page4 .annual-container .letter:eq(' + index + ')').addClass('selected');
	}
	$('.annual-container .pointer').css('transform', 'rotate(' + annualRotate + 'deg)');


	var commercial = $('input[name=commercial]').val().substr(0, 4);
	index = years.indexOf(Number(commercial));
	if (commercial < years[0]) {
		index = -1;
	} else if (commercial > years[4]) {
		index = 5;
	}
	var commercialRotate = 45 * index - 90;

	if (index != -1) {
		$('#page4 .commercial-container .letter:eq(' + index + ')').addClass('selected');
	}
	$('.commercial-container .pointer').css('transform', 'rotate(' + commercialRotate + 'deg)');


	var compulsory = $('input[name=compulsory]').val().substr(0, 4);
	index = years.indexOf(Number(compulsory));
	if (compulsory < years[0]) {
		index = -1;
	} else if (compulsory > years[4]) {
		index = 5;
	}
	var compulsoryRotate = 45 * index - 90;

	if (index != -1) {
		$('#page4 .compulsory-container .letter:eq(' + index + ')').addClass('selected');
	}
	$('.compulsory-container .pointer').css('transform', 'rotate(' + compulsoryRotate + 'deg)');
}

$(function() {
	$('.status0').show();
	requestAnimFrame(function() {
		$('.background').show();
	});
	//点击看大图
	$('#page2 .main img').tap(function(evt) {
		$('.grey-cover').show();
		$('#page2 .big-img .img').css('background-image', 'url("' + evt.target.src + '")');
		switchImg.setIndex($('#page2 .main img').index(evt.target));
		$('.big-img').show();
	});

	var qnUrl = $('input[name=qnUrl]').val();
	var carImg = JSON.parse($('input[name=car]').val() || '[]');
	var order = [5, 3, 6, 1, 0, 2, 7, 4, 8];
	for (var i = 0; i < order.length; i++) {
		if (carImg[order[i]] && carImg[order[i]].Path) {
			$('.car[index=' + order[i] + ']').attr('src', qnUrl + carImg[order[i]].Path);
		} else {
			$('.car[index=' + order[i] + ']').css('visibility', 'hidden');
		}
	}

	$('.car').each(function() {
		if ($(this).attr('src')) {
			imgs.push($(this).attr('src'));
		}
	});
	now = imgs[0];
	$('#page2 .big-img .img').touchMoved(function(dx, dy) {
		switchImg.cube(dx > 0 ? -1 : 1);
	});
});

var now;
var imgs = [];