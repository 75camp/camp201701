#题目
网站上让用户给出一组兴趣爱好选项，是以半角逗号分割的字符串，例如：'游泳,健身,舞蹈,阅读'。为了确保输入重复的项，要求实现一个函数，对字符串中的兴趣内容进行去重

输入示例：​'游泳,健身,篮球,游泳,篮球,阅读'

输出：'游泳,健身,篮球,阅读'​​​​​

###解题思路
当作数组去重来处理，将字符串转成数组，在将去重后的数组转成字符串。

数组去重用索引为不为-1，来去重。

因而得出：
<pre>
function reDuplicates(str) {
  var arr = str.split(",");
	var resArr = [];
	var flag = true;
	var len = arr.length;
	for (var i = 0;i < len;i++) {
		if (resArr.indexOf(arr[i]) == -1) {
			if (arr[i] != arr[i]) {
				if (flag) {
					resArr.push(arr[i]);
					flag = false;
				}
			} else {
				resArr.push(arr[i]);
			}
		}
	}
	return resArr.toString();
}
</pre>
考虑到由字符串转的情况不会有NaN的情况出现，所以是可以去掉这一步的。
但是如果是别的情况下，传入的数据进行了处理，还是有可能出现这种情况的。因而将这个处理的字符串处理转换部分和数组去重部分分离开来。
<pre>
function reDuplicates(arr) {
	var resArr = [];
	var flag = true;
	var len = arr.length;
	for (var i = 0;i < len;i++) {
		if (resArr.indexOf(arr[i]) == -1) {
			if (arr[i] != arr[i]) {
				if (flag) {
					resArr.push(arr[i]);
					flag = false;
				}
			} else {
				resArr.push(arr[i]);
			}
		}
	}
	return resArr;
}

function filterStr(str) {
  var arr = str.split(",");
  var temp = reDuplicates(arr);
  return temp.toString();
}

</pre>