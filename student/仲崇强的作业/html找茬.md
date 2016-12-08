##我找的网站是[百度知道首页](https://zhidao.baidu.com/)
***
>找到了以下几个可以改进的地方

0.  用到了html5的语义化标签`header`然而导航栏却没有用  `nav`,导航栏可以用一个 `nav`标签包裹，语义化更
好；
如：
![img](http://upload-images.jianshu.io/upload_images/3416759-5737e89da89ce078.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以改成
  ```
<header id="header">
          <div id="search-box"></div>
          <nav></nav>
</header>
```
1. `img`标签里没有`alt`属性
![img](http://upload-images.jianshu.io/upload_images/3416759-57f730598213a069.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
必须加上 `alt`属性

2.  单独的模块部分一律用了 `div`，最好使用html5的新语义化标签 `article`。

3. 链接的`Javascript`文件过多，要尽量合并