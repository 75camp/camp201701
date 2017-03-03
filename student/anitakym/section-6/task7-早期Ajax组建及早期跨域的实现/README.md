>早期版本的浏览器特别是 IE，不支持标准的 XMLHttpRequest，因此早期的 Ajax 组件需要对浏览器进行不同的封装才能使用。寻找早期框架或库中的 Ajax 组件并研究它的具体实现。

在XHR出香之前，Ajax式的通信必须借助一些hack手段来实现。
remote scripting 远程脚本

IE5中，XHR对象是通过MSXML库中一个ActiveX对象实现的。

//适用于IE7之前

<pre>
function createXHR() {
    if (typeof arguments.callee.activeXString != 'string'){
      var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
          i,len;
      
      for (i=0,len=versions.length;i<len;i++){
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch (ex){
          
        }
      }
    }
    
    return new ActiveXObject(arguments.callee.activeXString);
}
</pre>



>现代浏览器支持 CORS，即前面演示的设置 Access-Control-Allow-Origin 来让浏览器支持跨域。但是早期版本的浏览器并不支持 CORS，那么在这种情况下跨域要怎么实现呢？找出早期跨域的方式并深入弄清它们的根本原理。

###CORS基本思想
使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。

>CORS之前，开发人员利用DOM中能够执行跨域请求的功能，在不依赖XHR对象的情况下，也能发送某种请求。
--《javascript高级程序设计》

1.图像Ping（与服务器进行简单，单向的跨域通信的一种方式）
使用<img>标签

缺点：
只能发送GET请求，且无法访问服务器的响应文本
2.JSONP

JSON with padding

<script>标签
可以双向通信

缺点：安全性，而且不容易确定请求是否失败。



