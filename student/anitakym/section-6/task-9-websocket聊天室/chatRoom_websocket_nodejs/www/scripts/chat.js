window.addEventListener('load',function () {
    var chat = new Chat();
    chat.init();
});

var info = document.querySelector('#info');
var loginName = document.querySelector('.login--name');
var userName = document.querySelector('#user-name');
var userLogin = document.querySelector('#user-login');
var loginMask = document.querySelector('.login--mask');
var msgInput = document.querySelector('#msg-input');
var dialog = document.querySelector('.dialog');
var status = document.querySelector('#status');
var messageInput = document.querySelector('#msg-input');
var sender = document.querySelector('#sender');
//Chat里面写业务逻辑-处理消息，显示消息等


var Chat = function () {
    this.socket = null;
};

Chat.prototype = {
    init: function () {
        var that = this;
        //建立到服务器的连接
        this.socket = io.connect();
        //监听connect事件
        this.socket.on('connect',function () {
            info.textContent = '给自己取一个名字吧';
            loginName.style.display = 'block';
            userName.focus();

        });

        //冒泡阶段调用事件处理程序
        userLogin.addEventListener('click',function () {
            var userNameValue = userName.value;
            if (userNameValue.trim().length != 0) {
                //将输入昵称传给服务器
                that.socket.emit('login',userNameValue);
            } else {
                userName.focus();
            }
        },false);

        this.socket.on('hasExisted',function () {
            info.textContent = '当前用户名已存在，重新取个名字把'
        });
        this.socket.on('loginSuccess',function () {
            document.title = 'chatRoom-online' + userName.value;
            loginMask.style.display = 'none';
            msgInput.focus();

        });
        this.socket.on('system',function (userNameValue,userCount,type) {
            var msg = userNameValue + (type === 'login' ? '加入' : '离开');
            that._displayNewMsg('system',msg,'red');
            status.textContent = userCount + '人';

        });
        sender.addEventListener('click',function () {
            var msg = messageInput.value;
            messageInput.value = '';
            messageInput.focus();
            if(msg.trim().length != 0) {
                that.socket.emit('postMsg',msg);
                that._displayNewMsg('me',msg);
            }
        },false);
        this.socket.on('newMsg',function (user,msg) {
            that._displayNewMsg(user,msg)
        })
    },
    _displayNewMsg: function (user,msg,color) {
        var date = new Date().toTimeString().substr(0,8);
        var msgToDispaly = document.createElement('p');
        msgToDispaly.style.color = color || '#000';
        msgToDispaly.innerHTML = user + '<span class="timespan">(' + date + '):</span>' + msg;
        dialog.appendChild(msgToDispaly);
        dialog.scrollTop = dialog.scrollHeight;
    }
};
