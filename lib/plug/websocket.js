module.exports = () => {
var WebSocket = require('faye-websocket'),
    http      = require('http');

	$.server.on('upgrade', function(request, socket, body) {
	  if (WebSocket.isWebSocket(request)) {
	  	console.log(body);
	    var ws = new WebSocket(request, socket, body);

	    ws.on('message', function(event) {
	      console.log(event.data);
	      ws.send(event.data);
	    });

	    ws.on('close', function(event) {
	      console.log('close', event.code, event.reason);
	      ws = null;
	    });
	  }
	});
};

// module.exports = () => {
// 	// 创建WebSocket服务器
// 	var io = $['socket.io']($.server);
// 	// 打印提示
// 	console.log("╔══════════════════════════════════════════════════════════════════════════════════╗");
// 	console.log("╠═ "    + new Date() + " 启动WebSocket成功，端口: " + $.config.port +    " ═╣");
// 	console.log("╚══════════════════════════════════════════════════════════════════════════════════╝");
// 	// 监听WebSocket服务器连接
// 	io.of('/socket')
// 	  .on('connection', socket => {
// 		// 获得ip
// 		var ip = socket.handshake.address.split(':').pop();
// 	 	// 有人上线
// 	 	socket.on('online', (data) => {
// 	 		// 检查是否是已经登录绑定
// 	 		if (!$.config.socket.clients[data.user]) {
// 	 			// 打印提示
// 	 			console.log(data.user + "【" + ip + "】已连接成功");
// 	 			// 发送提示
// 	 			socket.emit('system', { code: '200', msg: '已连接成功' });
// 	 			// 存储用户
// 	      		$.config.socket.users.unshift(data.user);
// 	 		}
// 	 		// 存储连接
// 	 		$.config.socket.clients[data.user] = socket;
// 	 		// 执行完消息
// 	 		for (var key in $.config.socket.message) {
// 	 			for (var i=0; i < $.config.socket.message[key].length; i++) {
// 	 				$.config.socket.clients[key].emit($.config.socket.message[key][i].name, $.config.socket.message[key][i].data);
// 	 				$.config.socket.message[key].splice($.config.socket.message[key].indexOf(i), 1);
// 	 			}
// 	 		}
// 	 	});
// 	 	// 手动下线
// 	 	socket.on('offline', (data) => {
// 	 		if ($.config.socket.clients[data.user]) {
// 	 			// 发送提示
// 		 		$.config.socket.clients[data.user].emit('system', { code: '200', msg: '已成功断开' });
// 		 		// 触发下线
// 			    $.config.socket.clients[data.user].disconnect();
// 			}
// 		});
// 	 	// 自动下线
// 	 	socket.on('disconnect', () => {
// 	 		// 5秒后下线
// 	    	setTimeout(userOffline, 100);
// 	    	// 执行下线
// 	 		function userOffline() {
// 	 			// 遍历连接
// 			    for(var index in $.config.socket.clients) {
// 			    	// 找到连接
// 			        if($.config.socket.clients[index] == socket) {
// 			        	// 打印提示
// 			        	console.log(index + "【" + ip + "】已成功断开");
// 			        	// 取消用户
// 			          	$.config.socket.users.splice($.config.socket.users.indexOf(index), 1);
// 			          	// 取消服务
// 			          	delete $.config.socket.clients[index];
// 			          	// 跳出
// 			          	break;
// 			        }
// 			    }
// 		    }
// 	 	});
// 	 	// 扩展监听
// 	 	for (var key in $.config.socket.listeners) {
// 	 		// 追加监听
// 	 		socket.on(key, $.config.socket.listeners[key]);
// 	 	}
// 	});
// };