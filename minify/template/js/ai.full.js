var ai={touchClick:function(t,e){function n(o){var u=o.changedTouches[0].clientX,a=o.changedTouches[0].clientY;Math.abs(u-i)<5&&Math.abs(a-r)<5&&e.call(t,o),document.removeEventListener("touchend",n,!1)}var i=0,r=0;t.addEventListener("touchstart",function(t){i=t.touches[0].clientX,r=t.touches[0].clientY,document.addEventListener("touchend",n,!1)})},ovb:{_version_value:!1,_bversion_value:!1,_ua:navigator.userAgent,android:function(){var t=this._ua.match(/(Android)\s+([\d.]+)/);t=this.firefox()?this._ua.match(/(Android)/):t;var e=!!t;return!this._version_value&&e&&(this._version_value=t[2]),this.android=function(){return e},e},ios:function(){var t=this._ua.match(/.*OS\s([\d_]+)/),e=!!t;return!this._version_value&&e&&(this._version_value=t[1].replace(/_/g,".")),this.ios=function(){return e},e},ipod:function(){var t=this._ua.match(/(iPod).*OS\s([\d_]+)/),e=!!t;return!this._version_value&&e&&(this._version_value=t[2].replace(/_/g,".")),this.ipod=function(){return e},e},ipad:function(){var t=this._ua.match(/(iPad).*OS\s([\d_]+)/),e=!!t;return!this._version_value&&e&&(this._version_value=t[2].replace(/_/g,".")),this.ipad=function(){return e},e},iphone:function(){var t=this._ua.match(/(iPhone);.*OS\s([\d_]+)/),e=!!t;return!this._version_value&&e&&(this._version_value=t[2].replace(/_/g,".")),this.iphone=function(){return e},e},kindle:function(){var t=this._ua.match(/Kindle\/([\d.]+)/),e=!!t;return!this._version_value&&e&&(this._version_value=t[1]),this.kindle=function(){return e},e},webkit:function(){var t=this._ua.match(/WebKit\/([\d.]+)/),e=!!t;return!this._version_value&&e&&(this._bversion_value=t[1]),this.webkit=function(){return e},e},uc:function(){var t=this._ua.match(/UC/),e=!!t;return this.uc=function(){return e},e},opera:function(){var t=this._ua.match(/Opera/),e=!!t;return this.opera=function(){return e},e},firefox:function(){var t=this._ua.match(/Firefox/),e=!!t;return this.opera=function(){return e},e},qq:function(){return navigator.userAgent.toLowerCase().indexOf("mqqbrowser")>-1?!0:!1},miui:function(){return navigator.userAgent.toLowerCase().indexOf("miuibrowser")>-1?!0:!1},lenovo:function(){return navigator.userAgent.toLowerCase().indexOf("lenovo")>-1?!0:!1},chrome:function(){return navigator.userAgent.toLowerCase().indexOf("chrome")>-1?!0:!1},safari:function(){var t=this._ua.match(/Version.*Safari/),e=!!t;return this.safari=function(){return e},e},silk:function(){var t=this._ua.match(/Silk/),e=!!t;return this.silk=function(){return e},e},version:function(){return this._version_value},bVersion:function(){return this._bversion_value}},a:function(t){return document.querySelectorAll(t)},q:function(t){return document.querySelector(t)},i:function(t){return document.getElementById(t)},c:function(t){return document.getElementsByClassName(t)},hideUrl:function(){setTimeout(function(){window.scrollTo(0,1)},200)},wh:function(){return winHeight/scale},ww:function(){return winWidth/scale},hv:function(){return this.wh()/this.ww()>1?!0:!1},resize:function(t){this.resize_time=Date.now(),window.addEventListener("resize",function(){Date.now()-this.resize_time<200?this.resize_time=Date.now():(t(),this.resize_time=Date.now())},!1)},clone:function(t){function e(){}return e.prototype=t,new e},extend:function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.superclass=e.prototype,e.prototype.constructor==Object.prototype.constructor&&(e.prototype.constructor=e)},styleLoad:function(t,e){var n=document.createElement("style");n.type="text/css",n.src=t,document.head.appendChild(n),n.onload=function(){e()}},scriptLoad:function(t,e){var n=document.createElement("script");n.type="text/javascript",n.src=t,document.head.appendChild(n),n.onload=function(){e()}},touchMovePreventDefault:function(t){t.addEventListener("touchmove",function(t){t.preventDefault()},!1)}};