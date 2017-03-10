# 简历

简历的结构，布局按照自己的简历来，大致如下图。

![resume-layout](https://github.com/anitakym/camp201701/blob/master/student/anitakym/section-1/task02_resume/resume-small.png?raw=true)

* 由简历结构，由上到下分别为基础信息（左信息，右图），项目实习，教育经历，能力经验，技术能力和荣誉奖励。
* 有标题的用section，没有标题的用div,这样大纲结构比较清晰。
* 其中项目实习，教育经历,和荣誉奖励用表格的布局展示比较合适，所以用表格布局。也可以用css来实现，这里面还是选择表格。项目实习的格式可用奇偶选择器。
* 涉及到CSS布局的，用class，涉及到js控制的，用id。
* 如果有用了float元素，可能会有影响，所以要清除浮动的影响，在CSS里面定义类为clearfix，在元素有浮动的地方，在父元素上用clearfix，本次应该只有基础信息部分有用浮动。


