#happy number
题目是输入一个数，对数的处理是每个位的平方相加，得出新的数，一直重复，如果结果为1，则是happy number，如果结果无限循环，则不是。

###解题思路
首先，对数的处理，提取各个位数，求平方和：先把数变成字符串，字符串的split（“”）方法可以将数字一个个变成数组里的项，然后一个循环，累加每一项的平方。

再者，判断条件的处理：如果结果为1，则返回true；如果n出现了重复，则为无限循环，判断是否重复->可以先定义一个数组，判断n是否在数组里面已经存在，若是，则返回false，若不是，将n放进这个数组->或者可以建立一个数组，然后将每次有过的n值设置为true，如果再次出现

###性能方面需要考虑的：
本题没有什么操作，所以避免全局查找就可以。循环方面数值也比较小，没必要做循环优化，就要声明两个变量，最小化语句也不太有什么要去做。

<pre>
function dSquare(n) {
	var arr = n.toString().split("");
	var ans = 0;
	var temp;
	var len = arr.length;
	for (var i = 0;i < len;i++) {
		temp = parseInt(arr[i]);
		ans += temp * temp;
	}
	return ans;
}

var isHappy = function (n) {
	var flag = [];
	while (n) {
		if (n === 1) {
			return true;
		}
		if (flag[n] === 1){
			return flase;
		}
		flag[n] = 1;
		n = dSquare(n);
	}
}
</pre>