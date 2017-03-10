# 中科院继续教育网-HTML分析

> **北航管理学院的官网**(之前为学院构建过网站，用的是同样的CMS系统，其html修改比较受限制)
> **中科院继续教育网**（之前实习地方，传统的JSP，页面生成比较混乱，标签混合）
> **可汗学院**（结构很清晰，可当范例）

中科继续教育网，JSP，因为系统比较旧，开发人员主要为java工程师，构建过程中多人参与，但交接不好，所以从html角度来看，不符合规范，对性能和语义化不利的部分较多，因而选择对其分析。

###页面HTML分析
* 文档声明为：<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">。
如果需要使用符合 XML 规范的 XHTML 文档，则应该在文档中的<html> 标签中至少使用一个 xmlns 属性，以指定整个文档所使用的主要命名空间。但是看该网站具体写法，其实不太需要这么写。
* 内嵌style过多（有的并非js控制需要）
* 在调节格式时，用了多处&nbsp等占位符，不符合结构与样式分离
* 文档head中，添加了很多js文件，会带来在页面渲染中用户的体验很差。js和css文件没有很好的合并管理。
* 没有指定lang,以及基础的meta 中的charset和关键字的添加，因而对搜索引擎的很不友好。
* id和class的命名规则不统一，代码格式不规范，不利于阅读维护。
* 标签中用了很多关于样式的旧属性，如表格中。
* 文档结构，嵌套不清晰。

![html-dom](https://github.com/anitakym/camp201701/blob/master/student/anitakym/section-1/task01_analysis/html-dom.png?raw=true)




###HTML总体分析——对性能的影响（YSLOW）
现在对因为其结构不清晰，混乱，对性能的产生影响，做分析，下图为用YSLOW得出的一些数据。

![statics](https://github.com/anitakym/camp201701/blob/master/student/anitakym/section-1/task01_analysis/statistics.png?raw=true)
![grade1](https://github.com/anitakym/camp201701/blob/master/student/anitakym/section-1/task01_analysis/grade.png?raw=true)
![grade2](https://github.com/anitakym/camp201701/blob/master/student/anitakym/section-1/task01_analysis/grade2.png?raw=true)


综合而言，如下：
1. html中用了很多旧的，目前已被废弃的规范，语法；
2. html结构冗余太多，且嵌套不清晰；
3. 对搜索引擎不友好；
4. 完全无无障碍设计；
5. 没有实现结构和样式分离；
6. html语义不清晰。
