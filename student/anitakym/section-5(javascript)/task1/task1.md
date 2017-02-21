#task1
在电商购物网站上经常有购物卡出售，购物卡是一种可以充值的卡片，上面通常有20位密码，为了方便阅读以连字符分隔，例如： 3EFU8-RT67F-E42OP-8RPOL

要求：用 JavaScript 实现一个函数，读取用户输入的字符串，替换掉连字符，将小写字母转换为大写字母，然后判断是否是20位，若是，将转换后的字符串返回，否则抛出格式异常错误。

###解题思路
* 正则替换
* 检测长度

<pre>
function reFormat(str) {
	var ans = str.replace(/-/g,"").toUpperCase();
	var len = ans.length;
	const ERROR_MSG = "异常：无效的密码格式"
	if (len === 20) {
		return ans;
	}else {
		return ERROR_MSG;
	}
}

</pre>
