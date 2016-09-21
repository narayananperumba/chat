var express =require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs');
var path = require('path');

app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'css')))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.emit('message', { message: 'welcome to the chat' });
  	socket.on('send', function(data){
    io.emit('message', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});