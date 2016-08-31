$(function() {
	var swiper;

	$('.btns .back').tap(function() {
		$('.pictures').show();
		if (!swiper) {
			swiper = new Swiper('.swiper-container');
		}
	});

	$('.pictures').click(function(){
		$(this).hide();
	});

	$('.btns .close').tap(function() {
		history.go(-1);
	});
});