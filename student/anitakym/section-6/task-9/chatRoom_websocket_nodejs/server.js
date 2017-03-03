/*
var http = require('http');

server = http.createServer(function (req,res) {
    res.writeHead(200,{
        'Content-Type':'text/html'
    });
    res.write('<h1>hello world</h1>h1>');
    res.end();
});

server.listen(8080);
console.log('server started');*/

var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


//在线用户的用户名
var users = [];

app.use('/',express.static(__dirname + '/www'));
server.listen(8080);


//socket
io.on('connection',function (socket) {
    socket.on('login',function (userNameValue) {
        if (users.indexOf(userNameValue) > -1) {
            socket.emit('hasExisted');
        } else {
            socket.userIndex = users.length;
            socket.userNameValue = userNameValue;
            users.push(userNameValue);
            socket.emit('loginSuccess');
            //将当前登录的用户名称传到所有客户端
            //是sockets而不是socket
            io.sockets.emit('system',userNameValue,users.length,'login');
        }
    });
    socket.on('postMsg',function (msg) {
       socket.broadcast.emit('newMsg',socket.userNameValue,msg);
    });

    socket.on('disconnect',function () {
       users.splice(socket.userIndex,1);
       socket.broadcast.emit('system',socket.userNameValue,users.length,'logout');
    })
});
