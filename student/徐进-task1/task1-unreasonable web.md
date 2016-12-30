# task1-找茬
> 选取网站： [360官网](http://www.360.cn/)

我认为有以下几个不合理的地方，不对的地方还请老师多多批评指正。
***

* 非响应式设计 - 当页面宽度小于网页内容时会显示横向滚动条

 ![](http://7xss68.com1.z0.glb.clouddn.com/public/16-12-7/10102560.jpg)

* 网页头部没有用到*header*标签,顶部导航我认为可以用*nav*标签，在此均使用*div*标签。

 ![](http://7xss68.com1.z0.glb.clouddn.com/public/16-12-7/57446001.jpg)

* 网页底部没有用到*footer*标签，而是使用*div*标签。

 ![](http://7xss68.com1.z0.glb.clouddn.com/public/16-12-7/78817534.jpg)
 
* 我认为header下面的焦点区（轮播图和焦点产品）可以用*article*标签包裹。

 ![](http://7xss68.com1.z0.glb.clouddn.com/public/16-12-7/7169110.jpg)

* 顶部右侧的最新动态和快速下载栏目，我觉得可以考虑放在*aside*标签里面。

 ![](http://7xss68.com1.z0.glb.clouddn.com/public/16-12-7/81327164.jpg)

* 在网页中间的广告条，主要就是一张图片链接，我认为可以用*figure*标签包裹。

 ![](http://7xss68.com1.z0.glb.clouddn.com/public/16-12-7/64669222.jpg)

* 文档中有很多*img*标签中并没有指明*alt*参数，我觉得可能还是加上更好一些，也能提升文档的无障碍性。

 ![](http://7xss68.com1.z0.glb.clouddn.com/public/16-12-7/31698941.jpg)

* 除了header部分*tab*键可以正常按顺序focus，下面的内容就不知道focus到什么地方了，如果下面也能在元素被focus时加一个外围蓝色框或者其他标识应该会更好。

* 文档的轮播图中下面的carousel-indicators是用的*a*标签，我认为外面用*ul*和*li*标签加上*a*元素可能会更好些。

 ![](http://7xss68.com1.z0.glb.clouddn.com/public/16-12-7/45381962.jpg)

