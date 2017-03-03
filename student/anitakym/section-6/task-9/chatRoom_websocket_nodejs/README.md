#网页聊天室

>基于websocket协议,node.js
会用到express和socket.io两个模块。

1.起一个HTTP服务（server.js）

2.npm install express,这里用它管理路由响应请求。
(Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。)

3.npm install socket.io,将socket.io.js引入页面。
(<script src="/socket.io/socket.io.js"></script>,这个/socket.io/socket.io.js是socket.io服务器端以HTTP方式提供的静态文件。而在服务器端，socket.io和Express绑定了同样的端口。所以，在静态页面中，可以直接用这个方式来请求服务器上的文件。)
注意：刚开始的时候把socket.io.js的引入放在了脚本的后面，结果io无法解析。

4.构建页面结构和样式，引入js文件

5.创建自定义类型Chat（组合使用构造函数模式和原型模式，构造函数用于定义实例属性，原型模式用于定义方法和共享的属性）

6.在server.js里面创建一个名叫users的全局数组变量

7.实现用户取名登入过程，login，logout，system事件

8.实现消息发送功能,先改善区分开来系统消息。

9.
