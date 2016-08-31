(function(t){function e(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function n(t,e){return function(n){return h(t.call(this,n),e)}}function r(t,e){return function(n){return this.lang().ordinal(t.call(this,n),e)}}function s(){}function a(t){D(t),o(this,t)}function i(t){var e=y(t),n=e.year||0,r=e.month||0,s=e.week||0,a=e.day||0,i=e.hour||0,o=e.minute||0,u=e.second||0,d=e.millisecond||0;this._milliseconds=+d+1e3*u+6e4*o+36e5*i,this._days=+a+7*s,this._months=+r+12*n,this._data={},this._bubble()}function o(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return e.hasOwnProperty("toString")&&(t.toString=e.toString),e.hasOwnProperty("valueOf")&&(t.valueOf=e.valueOf),t}function u(t){var e,n={};for(e in t)t.hasOwnProperty(e)&&yt.hasOwnProperty(e)&&(n[e]=t[e]);return n}function d(t){return 0>t?Math.ceil(t):Math.floor(t)}function h(t,e,n){for(var r=""+Math.abs(t),s=t>=0;r.length<e;)r="0"+r;return(s?n?"+":"":"-")+r}function f(t,e,n,r){var s,a,i=e._milliseconds,o=e._days,u=e._months;i&&t._d.setTime(+t._d+i*n),(o||u)&&(s=t.minute(),a=t.hour()),o&&t.date(t.date()+o*n),u&&t.month(t.month()+u*n),i&&!r&&rt.updateOffset(t),(o||u)&&(t.minute(s),t.hour(a))}function c(t){return"[object Array]"===Object.prototype.toString.call(t)}function l(t){return"[object Date]"===Object.prototype.toString.call(t)||t instanceof Date}function _(t,e,n){var r,s=Math.min(t.length,e.length),a=Math.abs(t.length-e.length),i=0;for(r=0;s>r;r++)(n&&t[r]!==e[r]||!n&&p(t[r])!==p(e[r]))&&i++;return i+a}function m(t){if(t){var e=t.toLowerCase().replace(/(.)s$/,"$1");t=$t[t]||Vt[e]||e}return t}function y(t){var e,n,r={};for(n in t)t.hasOwnProperty(n)&&(e=m(n),e&&(r[e]=t[n]));return r}function g(e){var n,r;if(0===e.indexOf("week"))n=7,r="day";else{if(0!==e.indexOf("month"))return;n=12,r="month"}rt[e]=function(s,a){var i,o,u=rt.fn._lang[e],d=[];if("number"==typeof s&&(a=s,s=t),o=function(t){var e=rt().utc().set(r,t);return u.call(rt.fn._lang,e,s||"")},null!=a)return o(a);for(i=0;n>i;i++)d.push(o(i));return d}}function p(t){var e=+t,n=0;return 0!==e&&isFinite(e)&&(n=e>=0?Math.floor(e):Math.ceil(e)),n}function Y(t,e){return new Date(Date.UTC(t,e+1,0)).getUTCDate()}function M(t){return w(t)?366:365}function w(t){return t%4===0&&t%100!==0||t%400===0}function D(t){var e;t._a&&-2===t._pf.overflow&&(e=t._a[dt]<0||t._a[dt]>11?dt:t._a[ht]<1||t._a[ht]>Y(t._a[ut],t._a[dt])?ht:t._a[ft]<0||t._a[ft]>23?ft:t._a[ct]<0||t._a[ct]>59?ct:t._a[lt]<0||t._a[lt]>59?lt:t._a[_t]<0||t._a[_t]>999?_t:-1,t._pf._overflowDayOfYear&&(ut>e||e>ht)&&(e=ht),t._pf.overflow=e)}function v(t){return null==t._isValid&&(t._isValid=!isNaN(t._d.getTime())&&t._pf.overflow<0&&!t._pf.empty&&!t._pf.invalidMonth&&!t._pf.nullInput&&!t._pf.invalidFormat&&!t._pf.userInvalidated,t._strict&&(t._isValid=t._isValid&&0===t._pf.charsLeftOver&&0===t._pf.unusedTokens.length)),t._isValid}function k(t){return t?t.toLowerCase().replace("_","-"):t}function b(t,e){return e._isUTC?rt(t).zone(e._offset||0):rt(t).local()}function S(t,e){return e.abbr=t,mt[t]||(mt[t]=new s),mt[t].set(e),mt[t]}function T(t){delete mt[t]}function O(t){var e,n,r,s,a=0,i=function(t){if(!mt[t]&&gt)try{require("./lang/"+t)}catch(e){}return mt[t]};if(!t)return rt.fn._lang;if(!c(t)){if(n=i(t))return n;t=[t]}for(;a<t.length;){for(s=k(t[a]).split("-"),e=s.length,r=k(t[a+1]),r=r?r.split("-"):null;e>0;){if(n=i(s.slice(0,e).join("-")))return n;if(r&&r.length>=e&&_(s,r,!0)>=e-1)break;e--}a++}return rt.fn._lang}function G(t){return t.match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"")}function W(t){var e,n,r=t.match(wt);for(e=0,n=r.length;n>e;e++)Rt[r[e]]?r[e]=Rt[r[e]]:r[e]=G(r[e]);return function(s){var a="";for(e=0;n>e;e++)a+=r[e]instanceof Function?r[e].call(s,t):r[e];return a}}function F(t,e){return t.isValid()?(e=C(e,t.lang()),Jt[e]||(Jt[e]=W(e)),Jt[e](t)):t.lang().invalidDate()}function C(t,e){function n(t){return e.longDateFormat(t)||t}var r=5;for(Dt.lastIndex=0;r>=0&&Dt.test(t);)t=t.replace(Dt,n),Dt.lastIndex=0,r-=1;return t}function z(t,e){var n,r=e._strict;switch(t){case"DDDD":return Lt;case"YYYY":case"GGGG":case"gggg":return r?Ut:bt;case"Y":case"G":case"g":return Ht;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return r?Pt:St;case"S":if(r)return Ct;case"SS":if(r)return zt;case"SSS":if(r)return Lt;case"DDD":return kt;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ot;case"a":case"A":return O(e._l)._meridiemParse;case"X":return Ft;case"Z":case"ZZ":return Gt;case"T":return Wt;case"SSSS":return Tt;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return r?zt:vt;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return vt;default:return n=new RegExp(Z(I(t.replace("\\","")),"i"))}}function L(t){t=t||"";var e=t.match(Gt)||[],n=e[e.length-1]||[],r=(n+"").match(Nt)||["-",0,0],s=+(60*r[1])+p(r[2]);return"+"===r[0]?-s:s}function U(t,e,n){var r,s=n._a;switch(t){case"M":case"MM":null!=e&&(s[dt]=p(e)-1);break;case"MMM":case"MMMM":r=O(n._l).monthsParse(e),null!=r?s[dt]=r:n._pf.invalidMonth=e;break;case"D":case"DD":null!=e&&(s[ht]=p(e));break;case"DDD":case"DDDD":null!=e&&(n._dayOfYear=p(e));break;case"YY":s[ut]=p(e)+(p(e)>68?1900:2e3);break;case"YYYY":case"YYYYY":case"YYYYYY":s[ut]=p(e);break;case"a":case"A":n._isPm=O(n._l).isPM(e);break;case"H":case"HH":case"h":case"hh":s[ft]=p(e);break;case"m":case"mm":s[ct]=p(e);break;case"s":case"ss":s[lt]=p(e);break;case"S":case"SS":case"SSS":case"SSSS":s[_t]=p(1e3*("0."+e));break;case"X":n._d=new Date(1e3*parseFloat(e));break;case"Z":case"ZZ":n._useUTC=!0,n._tzm=L(e);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":t=t.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":t=t.substr(0,2),e&&(n._w=n._w||{},n._w[t]=e)}}function P(t){var e,n,r,s,a,i,o,u,d,h,f=[];if(!t._d){for(r=A(t),t._w&&null==t._a[ht]&&null==t._a[dt]&&(a=function(e){var n=parseInt(e,10);return e?e.length<3?n>68?1900+n:2e3+n:n:null==t._a[ut]?rt().weekYear():t._a[ut]},i=t._w,null!=i.GG||null!=i.W||null!=i.E?o=B(a(i.GG),i.W||1,i.E,4,1):(u=O(t._l),d=null!=i.d?J(i.d,u):null!=i.e?parseInt(i.e,10)+u._week.dow:0,h=parseInt(i.w,10)||1,null!=i.d&&d<u._week.dow&&h++,o=B(a(i.gg),h,d,u._week.doy,u._week.dow)),t._a[ut]=o.year,t._dayOfYear=o.dayOfYear),t._dayOfYear&&(s=null==t._a[ut]?r[ut]:t._a[ut],t._dayOfYear>M(s)&&(t._pf._overflowDayOfYear=!0),n=V(s,0,t._dayOfYear),t._a[dt]=n.getUTCMonth(),t._a[ht]=n.getUTCDate()),e=0;3>e&&null==t._a[e];++e)t._a[e]=f[e]=r[e];for(;7>e;e++)t._a[e]=f[e]=null==t._a[e]?2===e?1:0:t._a[e];f[ft]+=p((t._tzm||0)/60),f[ct]+=p((t._tzm||0)%60),t._d=(t._useUTC?V:$).apply(null,f)}}function H(t){var e;t._d||(e=y(t._i),t._a=[e.year,e.month,e.day,e.hour,e.minute,e.second,e.millisecond],P(t))}function A(t){var e=new Date;return t._useUTC?[e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()]:[e.getFullYear(),e.getMonth(),e.getDate()]}function x(t){t._a=[],t._pf.empty=!0;var e,n,r,s,a,i=O(t._l),o=""+t._i,u=o.length,d=0;for(r=C(t._f,i).match(wt)||[],e=0;e<r.length;e++)s=r[e],n=(o.match(z(s,t))||[])[0],n&&(a=o.substr(0,o.indexOf(n)),a.length>0&&t._pf.unusedInput.push(a),o=o.slice(o.indexOf(n)+n.length),d+=n.length),Rt[s]?(n?t._pf.empty=!1:t._pf.unusedTokens.push(s),U(s,n,t)):t._strict&&!n&&t._pf.unusedTokens.push(s);t._pf.charsLeftOver=u-d,o.length>0&&t._pf.unusedInput.push(o),t._isPm&&t._a[ft]<12&&(t._a[ft]+=12),t._isPm===!1&&12===t._a[ft]&&(t._a[ft]=0),P(t),D(t)}function I(t){return t.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(t,e,n,r,s){return e||n||r||s})}function Z(t){return t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function N(t){var n,r,s,a,i;if(0===t._f.length)return t._pf.invalidFormat=!0,void(t._d=new Date(NaN));for(a=0;a<t._f.length;a++)i=0,n=o({},t),n._pf=e(),n._f=t._f[a],x(n),v(n)&&(i+=n._pf.charsLeftOver,i+=10*n._pf.unusedTokens.length,n._pf.score=i,(null==s||s>i)&&(s=i,r=n));o(t,r||n)}function E(t){var e,n,r=t._i,s=At.exec(r);if(s){for(t._pf.iso=!0,e=0,n=It.length;n>e;e++)if(It[e][1].exec(r)){t._f=It[e][0]+(s[6]||" ");break}for(e=0,n=Zt.length;n>e;e++)if(Zt[e][1].exec(r)){t._f+=Zt[e][0];break}r.match(Gt)&&(t._f+="Z"),x(t)}else t._d=new Date(r)}function j(e){var n=e._i,r=pt.exec(n);n===t?e._d=new Date:r?e._d=new Date(+r[1]):"string"==typeof n?E(e):c(n)?(e._a=n.slice(0),P(e)):l(n)?e._d=new Date(+n):"object"==typeof n?H(e):e._d=new Date(n)}function $(t,e,n,r,s,a,i){var o=new Date(t,e,n,r,s,a,i);return 1970>t&&o.setFullYear(t),o}function V(t){var e=new Date(Date.UTC.apply(null,arguments));return 1970>t&&e.setUTCFullYear(t),e}function J(t,e){if("string"==typeof t)if(isNaN(t)){if(t=e.weekdaysParse(t),"number"!=typeof t)return null}else t=parseInt(t,10);return t}function q(t,e,n,r,s){return s.relativeTime(e||1,!!n,t,r)}function X(t,e,n){var r=ot(Math.abs(t)/1e3),s=ot(r/60),a=ot(s/60),i=ot(a/24),o=ot(i/365),u=45>r&&["s",r]||1===s&&["m"]||45>s&&["mm",s]||1===a&&["h"]||22>a&&["hh",a]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",ot(i/30)]||1===o&&["y"]||["yy",o];return u[2]=e,u[3]=t>0,u[4]=n,q.apply({},u)}function R(t,e,n){var r,s=n-e,a=n-t.day();return a>s&&(a-=7),s-7>a&&(a+=7),r=rt(t).add("d",a),{week:Math.ceil(r.dayOfYear()/7),year:r.year()}}function B(t,e,n,r,s){var a,i,o=V(t,0,1).getUTCDay();return n=null!=n?n:s,a=s-o+(o>r?7:0)-(s>o?7:0),i=7*(e-1)+(n-s)+a+1,{year:i>0?t:t-1,dayOfYear:i>0?i:M(t-1)+i}}function Q(t){var e=t._i,n=t._f;return null===e?rt.invalid({nullInput:!0}):("string"==typeof e&&(t._i=e=O().preparse(e)),rt.isMoment(e)?(t=u(e),t._d=new Date(+e._d)):n?c(n)?N(t):x(t):j(t),new a(t))}function K(t,e){rt.fn[t]=rt.fn[t+"s"]=function(t){var n=this._isUTC?"UTC":"";return null!=t?(this._d["set"+n+e](t),rt.updateOffset(this),this):this._d["get"+n+e]()}}function tt(t){rt.duration.fn[t]=function(){return this._data[t]}}function et(t,e){rt.duration.fn["as"+t]=function(){return+this/e}}function nt(t){var e=!1,n=rt;"undefined"==typeof ender&&(t?(it.moment=function(){return!e&&console&&console.warn&&(e=!0,console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")),n.apply(null,arguments)},o(it.moment,n)):it.moment=rt)}for(var rt,st,at="2.5.1",it=this,ot=Math.round,ut=0,dt=1,ht=2,ft=3,ct=4,lt=5,_t=6,mt={},yt={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},gt="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require,pt=/^\/?Date\((\-?\d+)/i,Yt=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Mt=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,wt=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,Dt=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,vt=/\d\d?/,kt=/\d{1,3}/,bt=/\d{1,4}/,St=/[+\-]?\d{1,6}/,Tt=/\d+/,Ot=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Gt=/Z|[\+\-]\d\d:?\d\d/gi,Wt=/T/i,Ft=/[\+\-]?\d+(\.\d{1,3})?/,Ct=/\d/,zt=/\d\d/,Lt=/\d{3}/,Ut=/\d{4}/,Pt=/[+-]?\d{6}/,Ht=/[+-]?\d+/,At=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,xt="YYYY-MM-DDTHH:mm:ssZ",It=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Zt=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Nt=/([\+\-]|\d\d)/gi,Et="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),jt={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},$t={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},Vt={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},Jt={},qt="DDD w W M D d".split(" "),Xt="M D H h m s w W".split(" "),Rt={M:function(){return this.month()+1},MMM:function(t){return this.lang().monthsShort(this,t)},MMMM:function(t){return this.lang().months(this,t)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(t){return this.lang().weekdaysMin(this,t)},ddd:function(t){return this.lang().weekdaysShort(this,t)},dddd:function(t){return this.lang().weekdays(this,t)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return h(this.year()%100,2)},YYYY:function(){return h(this.year(),4)},YYYYY:function(){return h(this.year(),5)},YYYYYY:function(){var t=this.year(),e=t>=0?"+":"-";return e+h(Math.abs(t),6)},gg:function(){return h(this.weekYear()%100,2)},gggg:function(){return h(this.weekYear(),4)},ggggg:function(){return h(this.weekYear(),5)},GG:function(){return h(this.isoWeekYear()%100,2)},GGGG:function(){return h(this.isoWeekYear(),4)},GGGGG:function(){return h(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return p(this.milliseconds()/100)},SS:function(){return h(p(this.milliseconds()/10),2)},SSS:function(){return h(this.milliseconds(),3)},SSSS:function(){return h(this.milliseconds(),3)},Z:function(){var t=-this.zone(),e="+";return 0>t&&(t=-t,e="-"),e+h(p(t/60),2)+":"+h(p(t)%60,2)},ZZ:function(){var t=-this.zone(),e="+";return 0>t&&(t=-t,e="-"),e+h(p(t/60),2)+h(p(t)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},Bt=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];qt.length;)st=qt.pop(),Rt[st+"o"]=r(Rt[st],st);for(;Xt.length;)st=Xt.pop(),Rt[st+st]=n(Rt[st],2);for(Rt.DDDD=n(Rt.DDD,3),o(s.prototype,{set:function(t){var e,n;for(n in t)e=t[n],"function"==typeof e?this[n]=e:this["_"+n]=e},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(t){return this._months[t.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(t){return this._monthsShort[t.month()]},monthsParse:function(t){var e,n,r;for(this._monthsParse||(this._monthsParse=[]),e=0;12>e;e++)if(this._monthsParse[e]||(n=rt.utc([2e3,e]),r="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[e]=new RegExp(r.replace(".",""),"i")),this._monthsParse[e].test(t))return e},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(t){return this._weekdays[t.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(t){return this._weekdaysShort[t.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(t){return this._weekdaysMin[t.day()]},weekdaysParse:function(t){var e,n,r;for(this._weekdaysParse||(this._weekdaysParse=[]),e=0;7>e;e++)if(this._weekdaysParse[e]||(n=rt([2e3,1]).day(e),r="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[e]=new RegExp(r.replace(".",""),"i")),this._weekdaysParse[e].test(t))return e},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(t){var e=this._longDateFormat[t];return!e&&this._longDateFormat[t.toUpperCase()]&&(e=this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(t){return t.slice(1)}),this._longDateFormat[t]=e),e},isPM:function(t){return"p"===(t+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(t,e,n){return t>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(t,e){var n=this._calendar[t];return"function"==typeof n?n.apply(e):n},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(t,e,n,r){var s=this._relativeTime[n];return"function"==typeof s?s(t,e,n,r):s.replace(/%d/i,t)},pastFuture:function(t,e){var n=this._relativeTime[t>0?"future":"past"];return"function"==typeof n?n(e):n.replace(/%s/i,e)},ordinal:function(t){return this._ordinal.replace("%d",t)},_ordinal:"%d",preparse:function(t){return t},postformat:function(t){return t},week:function(t){return R(t,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),rt=function(n,r,s,a){var i;return"boolean"==typeof s&&(a=s,s=t),i={},i._isAMomentObject=!0,i._i=n,i._f=r,i._l=s,i._strict=a,i._isUTC=!1,i._pf=e(),Q(i)},rt.utc=function(n,r,s,a){var i;return"boolean"==typeof s&&(a=s,s=t),i={},i._isAMomentObject=!0,i._useUTC=!0,i._isUTC=!0,i._l=s,i._i=n,i._f=r,i._strict=a,i._pf=e(),Q(i).utc()},rt.unix=function(t){return rt(1e3*t)},rt.duration=function(t,e){var n,r,s,a=t,o=null;return rt.isDuration(t)?a={ms:t._milliseconds,d:t._days,M:t._months}:"number"==typeof t?(a={},e?a[e]=t:a.milliseconds=t):(o=Yt.exec(t))?(n="-"===o[1]?-1:1,a={y:0,d:p(o[ht])*n,h:p(o[ft])*n,m:p(o[ct])*n,s:p(o[lt])*n,ms:p(o[_t])*n}):(o=Mt.exec(t))&&(n="-"===o[1]?-1:1,s=function(t){var e=t&&parseFloat(t.replace(",","."));return(isNaN(e)?0:e)*n},a={y:s(o[2]),M:s(o[3]),d:s(o[4]),h:s(o[5]),m:s(o[6]),s:s(o[7]),w:s(o[8])}),r=new i(a),rt.isDuration(t)&&t.hasOwnProperty("_lang")&&(r._lang=t._lang),r},rt.version=at,rt.defaultFormat=xt,rt.updateOffset=function(){},rt.lang=function(t,e){var n;return t?(e?S(k(t),e):null===e?(T(t),t="en"):mt[t]||O(t),n=rt.duration.fn._lang=rt.fn._lang=O(t),n._abbr):rt.fn._lang._abbr},rt.langData=function(t){return t&&t._lang&&t._lang._abbr&&(t=t._lang._abbr),O(t)},rt.isMoment=function(t){return t instanceof a||null!=t&&t.hasOwnProperty("_isAMomentObject")},rt.isDuration=function(t){return t instanceof i},st=Bt.length-1;st>=0;--st)g(Bt[st]);for(rt.normalizeUnits=function(t){return m(t)},rt.invalid=function(t){var e=rt.utc(NaN);return null!=t?o(e._pf,t):e._pf.userInvalidated=!0,e},rt.parseZone=function(t){return rt(t).parseZone()},o(rt.fn=a.prototype,{clone:function(){return rt(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var t=rt(this).utc();return 0<t.year()&&t.year()<=9999?F(t,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):F(t,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var t=this;return[t.year(),t.month(),t.date(),t.hours(),t.minutes(),t.seconds(),t.milliseconds()]},isValid:function(){return v(this)},isDSTShifted:function(){return this._a?this.isValid()&&_(this._a,(this._isUTC?rt.utc(this._a):rt(this._a)).toArray())>0:!1},parsingFlags:function(){return o({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(t){var e=F(this,t||rt.defaultFormat);return this.lang().postformat(e)},add:function(t,e){var n;return n="string"==typeof t?rt.duration(+e,t):rt.duration(t,e),f(this,n,1),this},subtract:function(t,e){var n;return n="string"==typeof t?rt.duration(+e,t):rt.duration(t,e),f(this,n,-1),this},diff:function(t,e,n){var r,s,a=b(t,this),i=6e4*(this.zone()-a.zone());return e=m(e),"year"===e||"month"===e?(r=432e5*(this.daysInMonth()+a.daysInMonth()),s=12*(this.year()-a.year())+(this.month()-a.month()),s+=(this-rt(this).startOf("month")-(a-rt(a).startOf("month")))/r,s-=6e4*(this.zone()-rt(this).startOf("month").zone()-(a.zone()-rt(a).startOf("month").zone()))/r,"year"===e&&(s/=12)):(r=this-a,s="second"===e?r/1e3:"minute"===e?r/6e4:"hour"===e?r/36e5:"day"===e?(r-i)/864e5:"week"===e?(r-i)/6048e5:r),n?s:d(s)},from:function(t,e){return rt.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)},fromNow:function(t){return this.from(rt(),t)},calendar:function(){var t=b(rt(),this).startOf("day"),e=this.diff(t,"days",!0),n=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse";return this.format(this.lang().calendar(n,this))},isLeapYear:function(){return w(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(t){var e=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=t?(t=J(t,this.lang()),this.add({d:t-e})):e},month:function(t){var e,n=this._isUTC?"UTC":"";return null!=t?"string"==typeof t&&(t=this.lang().monthsParse(t),"number"!=typeof t)?this:(e=this.date(),this.date(1),this._d["set"+n+"Month"](t),this.date(Math.min(e,this.daysInMonth())),rt.updateOffset(this),this):this._d["get"+n+"Month"]()},startOf:function(t){switch(t=m(t)){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===t?this.weekday(0):"isoWeek"===t&&this.isoWeekday(1),this},endOf:function(t){return t=m(t),this.startOf(t).add("isoWeek"===t?"week":t,1).subtract("ms",1)},isAfter:function(t,e){return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)>+rt(t).startOf(e)},isBefore:function(t,e){return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)<+rt(t).startOf(e)},isSame:function(t,e){return e=e||"ms",+this.clone().startOf(e)===+b(t,this).startOf(e)},min:function(t){return t=rt.apply(null,arguments),this>t?this:t},max:function(t){return t=rt.apply(null,arguments),t>this?this:t},zone:function(t){var e=this._offset||0;return null==t?this._isUTC?e:this._d.getTimezoneOffset():("string"==typeof t&&(t=L(t)),Math.abs(t)<16&&(t=60*t),this._offset=t,this._isUTC=!0,e!==t&&f(this,rt.duration(e-t,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(t){return t=t?rt(t).zone():0,(this.zone()-t)%60===0},daysInMonth:function(){return Y(this.year(),this.month())},dayOfYear:function(t){var e=ot((rt(this).startOf("day")-rt(this).startOf("year"))/864e5)+1;return null==t?e:this.add("d",t-e)},quarter:function(){return Math.ceil((this.month()+1)/3)},weekYear:function(t){var e=R(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==t?e:this.add("y",t-e)},isoWeekYear:function(t){var e=R(this,1,4).year;return null==t?e:this.add("y",t-e)},week:function(t){var e=this.lang().week(this);return null==t?e:this.add("d",7*(t-e))},isoWeek:function(t){var e=R(this,1,4).week;return null==t?e:this.add("d",7*(t-e))},weekday:function(t){var e=(this.day()+7-this.lang()._week.dow)%7;return null==t?e:this.add("d",t-e)},isoWeekday:function(t){return null==t?this.day()||7:this.day(this.day()%7?t:t-7)},get:function(t){return t=m(t),this[t]()},set:function(t,e){return t=m(t),"function"==typeof this[t]&&this[t](e),this},lang:function(e){return e===t?this._lang:(this._lang=O(e),this)}}),st=0;st<Et.length;st++)K(Et[st].toLowerCase().replace(/s$/,""),Et[st]);K("year","FullYear"),rt.fn.days=rt.fn.day,rt.fn.months=rt.fn.month,rt.fn.weeks=rt.fn.week,rt.fn.isoWeeks=rt.fn.isoWeek,rt.fn.toJSON=rt.fn.toISOString,o(rt.duration.fn=i.prototype,{_bubble:function(){var t,e,n,r,s=this._milliseconds,a=this._days,i=this._months,o=this._data;o.milliseconds=s%1e3,t=d(s/1e3),o.seconds=t%60,e=d(t/60),o.minutes=e%60,n=d(e/60),o.hours=n%24,a+=d(n/24),o.days=a%30,i+=d(a/30),o.months=i%12,r=d(i/12),o.years=r},weeks:function(){return d(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*p(this._months/12)},humanize:function(t){var e=+this,n=X(e,!t,this.lang());return t&&(n=this.lang().pastFuture(e,n)),this.lang().postformat(n)},add:function(t,e){var n=rt.duration(t,e);return this._milliseconds+=n._milliseconds,this._days+=n._days,this._months+=n._months,this._bubble(),this},subtract:function(t,e){var n=rt.duration(t,e);return this._milliseconds-=n._milliseconds,this._days-=n._days,this._months-=n._months,this._bubble(),this},get:function(t){return t=m(t),this[t.toLowerCase()+"s"]()},as:function(t){return t=m(t),this["as"+t.charAt(0).toUpperCase()+t.slice(1)+"s"]()},lang:rt.fn.lang,toIsoString:function(){var t=Math.abs(this.years()),e=Math.abs(this.months()),n=Math.abs(this.days()),r=Math.abs(this.hours()),s=Math.abs(this.minutes()),a=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(t?t+"Y":"")+(e?e+"M":"")+(n?n+"D":"")+(r||s||a?"T":"")+(r?r+"H":"")+(s?s+"M":"")+(a?a+"S":""):"P0D"}});for(st in jt)jt.hasOwnProperty(st)&&(et(st,jt[st]),tt(st.toLowerCase()));et("Weeks",6048e5),rt.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},rt.lang("en",{ordinal:function(t){var e=t%10,n=1===p(t%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th";return t+n}}),gt?(module.exports=rt,nt(!0)):"function"==typeof define&&define.amd?define("moment",function(e,n,r){return r.config&&r.config()&&r.config().noGlobal!==!0&&nt(r.config().noGlobal===t),rt}):nt()}).call(this);