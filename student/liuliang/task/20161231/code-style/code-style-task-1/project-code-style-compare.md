###github项目代码风格の比较
<table  class="table table-bordered table-striped table-condensed">
        <tr>
            <th rowspan="2"><center>github项目名</center></th>
            <th colspan="3"><center>广义的代码格式</center></th>
            <th colspan="10"><center>狭义的代码格式</center></th>
            <th colspan="3"><center>特殊的js风格</center></th>
        </tr>
        <tr>
            <th><center>目录结构和文件名</th>
            <th><center>　　　　　　　　变量命名　　　　　　　　</center></th>
            <th><center>　　文档规范　　</center></th>
            <th><center>　　　　　　　　缩进方式　　　　　　　　</center></th>
            <th><center>　　　　　　　　使用字符串的方式　　　　　　　　</center></th>
            <th><center>　　　　　　　　存在变量声明后未使用　　　　　　　　</center></th>
            <th><center>　　　　　　　　在语句，表达式结束处添加分号　　　　　　　　</center></th>
            <th><center>　　　　　　　　以<code>(</code>，<code>[</code>，<code>'</code>作为一行的开头　　　　　　　　</center></th>
            <th><center>　　　　　　　　关键词后有空格　　　　　　　　</center></th>
            <th><center>　　　　　　　　函数名后有空格　　　　　　　　</center></th>
            <th><center>　　　　　　　　使用严格模式进行值比较　　　　　　　　</center></th>
            <th><center>　　　　　　　　会进行错误处理　　　　　　　　</center></th>
            <th><center>　　　　　　　　使用全局变量，会添加<code>window</code>　　　　　　　　</center></th>
            <th><center>　　　　　　　　IIFE　　　　　　　　</center></th>
            <th><center>　　　　　　　　严格模式　　　　　　　　</center></th>
            <th>模块</th>
        </tr>
        <tr>
            <th><center>thinkjs</center></th>
            <td>
            <ul>
            	<li>
            		<code>doc</code>
            		<ul>
            			<li><code>README.md</code></li>
            		</ul>
            	</li>
            	<li>
            		<code>lib</code>
         			<ul>
            			<li><code>Common</code></li>
            			<li><code>Conf</code></li>
            			<li><code>Lib</code></li>
            			<li><code>View</code></li>
             			<li><code>think.js</code></li>
            		</ul>
            	</li>
            	<li>
            		<code>test</code>
         			<ul>
            			<li><code>Common</code></li>
            			<li><code>Conf</code></li>
            			<li><code>Lib</code></li>
            			<li><code>View</code></li>
             			<li><code>think.js</code></li>
            		</ul>
            	</li>
            </ul>
            </td>
            <td>
	            <ol>
		            <li>常量字母全部大写，多个单词之间使用下划线</li>
		            <li>变量名为一个单词时，全部小写，多个单词驼峰写法</li>
		            <li>第一层文件夹名字全部小写，第二层文件夹名字首字母大写</li>
	            </ol>
            </td>
            <td>
	            <ol>
		            <li>文件头部进行文档注释，例如：<pre><code>/**
		
		 * 行为类
		
		 * @return {[type]} [description]
		
		 */
		</code></li>
						<li>文件关键部分进行文档注释，例如：<pre><code>/**
		
		 * 生成cookie签名
		
		 * @param  string val
		
		 * @param  string secret
		
		 * @return string
		
		 */
		
		var cookieSign = function(val, secret){
		
		  'use strict';
		
		  secret = crypto.createHmac('sha256', secret).update(val).digest('base64');
		
		  secret = secret.replace(/\=+$/, '');
		
		  return val + '.' + secret;
		
		};
		
					</li>
				</ol>
			</td>
			<td>2个空格</td>
			<td><center>单引号</td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487714497_Close_Icon_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487714497_Close_Icon_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487714497_Close_Icon_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487714497_Close_Icon_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td>ES6</td>
        </tr>
        <tr>
            <th><center>avalon</center></th>
            <td>
	            <ul>
	            	<li>
	            		<code>components</code>
	            		<ul>
	            			<li><code>button</code></li>
	            			<li><code>list</code></li>
	            			<li><code>loading</code></li>
	            			<li><code>pager</code></li>
	            			<li><code>panel</code></li>
	            			<li><code>router</code></li>
	            			<li><code>select</code></li>
	            			<li><code>logo.png</code></li>
	            		</ul>
	            	</li>
	            	<li>
	            		<code>dist</code>
	         			<ul>
	            			<li><code>arthur.js</code></li>
	            			<li><code>avalon.js</code></li>
	            			<li><code>avalon.modern.js</code></li>
	         			</ul>
	            	</li>
	            	<li>
	            		<code>test</code>
	         			<ul>
	            			<li><code>directives</code></li>
	            			<li><code>dom</code></li>
	            			<li><code>filters</code></li>
	            			<li><code>parser</code></li>
	             			<li><code>seed</code></li>
	             			<li><code>vdom</code></li>
	             			<li><code>vmodel</code></li>
	             			<li><code>vtree</code></li>
	             			<li><code>beforeIt.js</code></li>
	             			<li><code>jquery.js</code></li>
	             			<li><code>matchers.js</code></li>
	             			<li><code>promise.js</code></li>
	             			<li><code>spec.js</code></li>
	             			<li><code>spec.modern.js</code></li>
	             			<li><code>test.js</code></li>
	            		</ul>
	            	</li>
	            	<li>
	            		<code>src</code>
	         			<ul>
	            			<li><code>component</code></li>
	            			<li><code>directives</code></li>
	            			<li><code>dom</code></li>
	            			<li><code>effect</code></li>
	             			<li><code>filters</code></li>
	             			<li><code>gesture</code></li>
	             			<li><code>parser</code></li>
	             			<li><code>renders</code></li>
	             			<li><code>seed</code></li>
	             			<li><code>vdom</code></li>
	             			<li><code>vmodel</code></li>
	             			<li><code>vtree</code></li>
	             			<li><code>avalon.js</code></li>
	             			<li><code>avalon.modern.js</code></li>
	             			<li><code>avalon.tap.js</code></li>      				             	             			<li><code>pager.js</code></li>
	             			<li><code>routergrid.js</code></li>
	            		</ul>
	            	</li>
	            </ul>
            </td>
            <td>
            	<ol>
		            <li>常量字母全部大写，多个单词之间使用下划线</li>
		            <li>变量名为一个单词时，全部小写，多个单词驼峰写法</li>
		            <li>文件夹名字均小写</li>
            	</ol>
            </td>
            <td>
	            <ol>
		            <li>文件头部进行文档注释，例如：<pre><code>/*!

built in 2017-2-17:17:59 version 2.2.4 by 司徒正美

https://github.com/RubyLouvre/avalon/tree/2.2.4



修正IE下 orderBy BUG

更改下载Promise的提示

修复avalon.modern 在Proxy 模式下使用ms-for 循环对象时出错的BUG

修复effect内部传参 BUG

重构ms-validate的绑定事件的机制



*/</code></li>
						<li>文件关键部分进行文档注释，例如：<pre><code>    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

    /**

     * Shim for "fixing" IE's lack of support (IE < 9) for applying slice

     * on host objects like NamedNodeMap, NodeList, and HTMLCollection

     * (technically, since host objects have been implementation-dependent,

     * at least before ES6, IE hasn't needed to work this way).

     * Also works on strings, fixes IE < 9 to allow an explicit undefined

     * for the 2nd argument (as in Firefox), and prevents errors when

     * called on other DOM objects.

     */



    try {

        // Can't be used with DOM elements in IE < 9

        _slice.call(avalon.document.documentElement);

    } catch (e) {

        // Fails in IE < 9

        // This will work for genuine arrays, array-like objects,

        // NamedNodeMap (attributes, entities, notations),

        // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),

        // and will not fail on other DOM objects (as do DOM elements in IE < 9)

        /* istanbul ignore next*/

        ap.slice = function (begin, end) {

            // IE < 9 gets unhappy with an undefined end argument

            end = typeof end !== 'undefined' ? end : this.length;



            // For native Array objects, we use the native slice function

            if (Array.isArray(this)) {

                return _slice.call(this, begin, end);

            }



            // For array like object we handle it ourselves.

            var i,

                cloned = [],

                size,

                len = this.length;



            // Handle negative value for "begin"

            var start = begin || 0;

            start = start >= 0 ? start : len + start;



            // Handle negative value for "end"

            var upTo = end ? end : len;

            if (end < 0) {

                upTo = len + end;

            }



            // Actual expected size of the slice

            size = upTo - start;

        };

    }
					</li>
				</ol>
			</td>
			<td>四个空格</td>
			<td><center>双引号</td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487714497_Close_Icon_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td><center><img src="http://ohupawle2.bkt.clouddn.com/1487713331_Tick_Mark_Dark.png"/></td>
			<td>ES6</td>
        </tr>
</table>
---
综合比较，我还是喜欢avalon的文件命名方式，喜欢thinkjs的模块系统

