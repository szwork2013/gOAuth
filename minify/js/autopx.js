document.documentElement.clientWidth<300&&!function(i,e,t,n){i.isVertical=function(){return 0==i.orientation||180==i.orientation},function(i,e,t){n.content=360>i?"width=640,target-densitydpi="+e+",initial-scale="+t+",minimum-scale="+t+",maximum-scale="+t+",user-scalable=no":navigator.userAgent.match(/.*OS\s([\d_]+)/)?function(i){return"width=device-width,initial-scale="+i+",minimum-scale="+i+",maximum-scale="+i+",user-scalable=no"}(i/640):"width=640,target-densitydpi="+e+",initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"}(e>t?t:e,(640/e*i.devicePixelRatio*160).toFixed(0),1/i.devicePixelRatio)}(window,window.screen.width,window.screen.height,document.getElementById("viewport"));