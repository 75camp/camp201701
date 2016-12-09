# HTML 代码中不合理之处

### 以下总结依据为最新的HTML5严格标准和规范

## 一、语法上分析
* img 属性内的 alt 没有写全
* img 指明 宽 `width` 和 高 `height` 时，单独写在样式表中
* button 作为 `type=button` 时，没有合理指明 type
* 在使用属性上，有一些网站使用单引号
* 属性名全小写，用中线“-”作为分隔符，有一些网站没有按照此标准
* 不需要在自闭合标签结尾处使用斜线（HTML5 规范），存在 `<br/>`

## HTML5 doctype
* 虽然 doctype 不区分大小写，但是按照惯例，doctype 应该大写
  <!DOCTYPE html>，有一些网站存在小写形式

## lang 属性
* 根据 HTML5 规范，应在 html 标签上加上 lang 属性（给语音和翻译工具帮助），有一些网站上并未指明 lang 属性

## 字符编码
* 通常声明一个明确的字符编码，指定为 UTF-8，有一些网站是gb2312编码格式

## IE 兼容模式
* 用 <meta> 标签指定页面用什么版本的IE来渲染，有一些网站并没有写此项
 `<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">`

## 引入 CSS, JS
* 根据 HTML5 规范，引入 CSS 和 JS 时不需要指明 type（因为 text/css 和 text/javascript 分别是他们的默认值）

## 样式结构
* 样式结构未分离，代码混乱，命名规则存在一定的问题
* 大多数网站并没有做到语义化，结构布局的元素命名不规范

## 属性顺序（网上搜集）
### 属性应该按照特定的顺序出现以保证易读性：
* class（class是为高可复用组件设计的）
* id（id更加具体且应该尽量少使用）
* name
* data-*
* src, for, type, href, value , max-length, max, min, pattern
* placeholder, title, alt
* `aria-*`, role
* required, readonly, disabled

## 标签数量
* 有一些网站上存在多余的父节点，存在代码冗余（多div，多span），应尽量减少标签

## 找茬网站如下
沪江网校、站长工具-站长之家、新浪汽车、腾讯网、阳光高考、凤凰资讯等其他小网站
