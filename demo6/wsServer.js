var app = require('http').createServer()
var io = require('socket.io')(app)

var PORT = 3000

var clientCount = 0

app.listen(PORT)

io.on('connection', function(socket){
	clientCount++
	socket.nickname = 'user' + clientCount
	// 客户端进入
	io.emit('enter', socket.nickname + ' comes in')
	// 接收客户端消息
	socket.on('message', function(str){
		// 广播客户端消息
		io.emit('message', socket.nickname + ' says: ' + str)
	})
	// 客户端断开
	socket.on('disconnect', function(){
		io.emit('leave', socket.nickname + ' left')
	})
})

console.log("websocket server listening on port " + PORT)
