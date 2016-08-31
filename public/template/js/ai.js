/**
 * ai是一个提供基础常用函数的单体。各个函数的功能见各个函数的注释。
 * @author 黄浩明
 * @version 3.0.1
 */
var ai = {
	ovb: {
		/**
		 * 该对象用于判断系统，系统版本，浏览器，苹果设备等等功能。ovb是单词 Os Version Browser 的头字母缩写。
		 */
		_version_value: false,
		_bversion_value: false,
		_ua: navigator.userAgent,
		android: function() {
			/**
			 * 该方法用于判断是否为安卓平台，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/(Android)\s+([\d.]+)/);
			//如果是fierfox浏览器(不带android版本号)
			regular_result = this.firefox() ? this._ua.match(/(Android)/) : regular_result;
			var os_boolean = !!regular_result;
			if (!this._version_value && os_boolean) {
				this._version_value = regular_result[2];
			}
			this.android = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		ios: function() {
			/**
			 * 该方法用于判断是否为iOS平台，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/.*OS\s([\d_]+)/),
				os_boolean = !!regular_result;
			if (!this._version_value && os_boolean) {
				this._version_value = regular_result[1].replace(/_/g, '.');
			}
			this.ios = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		ipod: function() {
			/**
			 * 该方法用于判断是否为ipod设备，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/(iPod).*OS\s([\d_]+)/),
				os_boolean = !!regular_result;
			if (!this._version_value && os_boolean) {
				this._version_value = regular_result[2].replace(/_/g, '.');
			}
			this.ipod = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		ipad: function() {
			/**
			 * 该方法用于判断是否为ipad设备，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/(iPad).*OS\s([\d_]+)/),
				os_boolean = !!regular_result;
			if (!this._version_value && os_boolean) {
				this._version_value = regular_result[2].replace(/_/g, '.');
			}
			this.ipad = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		iphone: function() {
			/**
			 * 该方法用于判断是否为iphone设备，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/(iPhone);.*OS\s([\d_]+)/),
				os_boolean = !!regular_result;
			if (!this._version_value && os_boolean) {
				this._version_value = regular_result[2].replace(/_/g, '.');
			}
			this.iphone = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		kindle: function() {
			/**
			 * 该方法用于判断是否为kindle设备，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/Kindle\/([\d.]+)/),
				os_boolean = !!regular_result;
			if (!this._version_value && os_boolean) {
				this._version_value = regular_result[1];
			}
			this.kindle = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		webkit: function() {
			/**
			 * 该方法用于判断是否为webkit内核的浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/WebKit\/([\d.]+)/),
				os_boolean = !!regular_result;
			if (!this._version_value && os_boolean) {
				this._bversion_value = regular_result[1];
			}
			this.webkit = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		uc: function() {
			/**
			 * 该方法用于判断是否为UC内核的浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 * @tip    该函数只在安卓平台能正常判断，慎用！
			 */
			var regular_result = this._ua.match(/UC/),
				os_boolean = !!regular_result;
			this.uc = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		opera: function() {
			/**
			 * 该方法用于判断是否为opera浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/Opera/),
				os_boolean = !!regular_result;
			this.opera = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		firefox: function() {
			/**
			 * 该方法用于判断是否为firefox浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/Firefox/),
				os_boolean = !!regular_result;
			this.opera = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		qq: function() {
			/**
			 * 该方法用于判断是否为qq浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			if (navigator.userAgent.toLowerCase().indexOf('mqqbrowser') > -1) {
				return true;
			} else {
				return false;
			}
		},
		miui: function() {
			/**
			 * 该方法用于判断是否为miui浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			if (navigator.userAgent.toLowerCase().indexOf('miuibrowser') > -1) {
				return true;
			} else {
				return false;
			}
		},
		lenovo: function() {
			/**
			 * 该方法用于判断是否为lenovo设备，在联想设备上所有的浏览器都包含lenovo，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			if (navigator.userAgent.toLowerCase().indexOf('lenovo') > -1) {
				return true;
			} else {
				return false;
			}
		},
		chrome: function() {
			/**
			 * 该方法用于判断是否为chrome浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
				return true;
			} else {
				return false;
			}
		},
		safari: function() {
			/**
			 * 该方法用于判断是否为safari浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 * @tip    该函数在一些不知名的浏览器如遨游之类上不能正常判断
			 */
			var regular_result = this._ua.match(/Version.*Safari/),
				os_boolean = !!regular_result;
			this.safari = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		silk: function() {
			/**
			 * 该方法用于判断是否为silk浏览器，如果是返回ture 否 返回 false
			 * @return ture或者false
			 */
			var regular_result = this._ua.match(/Silk/),
				os_boolean = !!regular_result;
			this.silk = function() {
				return os_boolean;
			};
			return os_boolean;
		},
		version: function() {
			/**
			 * 该方法返回系统的版本
			 * @return 系统版本号例如 5.5.1
			 */
			return this._version_value;
		},
		bVersion: function() {
			/**
			 * 该方法返回webkit浏览器的版本
			 * @return 系统版本号例如 5.5.1
			 */
			return this._bversion_value;
		}
	}
}