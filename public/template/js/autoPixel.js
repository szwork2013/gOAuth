var viewport = document.getElementById("viewport");
var viewPortScale = 1 / window.devicePixelRatio;
var screenwidth, screenhight;
screenwidth = window.screen.width;
screenhight = window.screen.height;

var viewPortdpi = 640 / screenwidth * window.devicePixelRatio * 160;
viewPortdpi = viewPortdpi.toFixed(0);

//判断是横屏还是竖屏(竖屏：true，横屏：false)
function IsVertialOrHorizontal() {
	return window.orientation == 0 || window.orientation == 180;
}
var isVertical = IsVertialOrHorizontal();
window.vps;

if (window.screen.height < window.screen.width) {
	screenwidth = window.screen.height;
}
if (screenwidth < 360) {
	viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + viewPortScale + ",minimum-scale=" + viewPortScale + ",maximum-scale=" + viewPortScale + ",user-scalable=no";
	vps = viewPortScale;
} else {
	var ratio = screenwidth / 640;
	viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
	vps = ratio;
}

//安卓设备
if (ai.ovb.android()) {
	//QQ浏览器
	if (ai.ovb.qq()) {
		viewport.content = "width=device-width,target-densitydpi=" + viewPortdpi + ",initial-scale=0.999,minimum-scale=0.999,maximum-scale=0.999,user-scalable=no";
	}
	//MIUI浏览器、联想、三星等默认浏览器
	if (ai.ovb.miui() || (!ai.ovb.uc() && !ai.ovb.opera() && !ai.ovb.firefox() && !ai.ovb.qq() && !ai.ovb.miui() && !ai.ovb.chrome())) {
		if (window.screen.height < window.screen.width) {
			screenwidth = window.screen.height;
		}
		viewPortdpi = 640 / screenwidth * window.devicePixelRatio * 160;
		viewPortdpi = viewPortdpi.toFixed(0);
		viewport.content = "width=device-width,target-densitydpi=" + viewPortdpi + ",initial-scale=0.999,minimum-scale=0.999,maximum-scale=0.999,user-scalable=no";
	}
	//UC浏览器
	if (ai.ovb.uc()) {
		var big = window.screen.height > window.screen.width ? window.screen.height : window.screen.width;
		var small = window.screen.height < window.screen.width ? window.screen.height : window.screen.width;
		var ratio = isVertical ? 1 : small / big;
		viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
		vps = ratio;
	}
	//firefox浏览器
	if (ai.ovb.firefox()) {
		var ratio = screenwidth / 640;
		viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
		vps = ratio;
		document.head.innerHTML = document.head.innerHTML;
		document.body.innerHTML = document.body.innerHTML;
	}
}

localStorage.viewportContent = viewport.content;
if (vps > 1) vps = 1 / vps;
localStorage.fontSize = 10 * Math.max(1, 0.65 / vps) + 'px';
document.getElementsByTagName('html')[0].style.fontSize = localStorage.fontSize;