## 作业1：找茬
* 选择任意一个线上页面（各大公司均可），指出 HTML 代码中的不合理之处。
网站：[美洽官网](http://meiqia.com/)

---------------------------------
1. 没有充分使用html标签，在标签上也体现不出语义化，不利于搜索引擎读取。
    * `<div class="header"></div>`可以改为`<header></header>`
    * `<div class="nav"></div>`可以改为`<nav></nav>`
    * `<div class="section section-highlight"></div>`可以改为`<section class=" section-highlight"></section>`
    * `<div class="footer"></div>`可以改为`<footer></footer>`
    
2.没有充分利用`<mata>`标签，可以再加上`<meta name="keyword">`，利于搜索引擎搜索关键字。

3.没有做到很好的可访问性,对于一些残障人士或不使用鼠标的用户不够友好。
    * 由于没有使用accesskey & tabindex属性，处a标签等少数标签外，tab键无法到达，如网页中心的浮层就无法通过键盘关闭，也无法打开又下角的“客服”窗口。