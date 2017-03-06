##32位有符号整数逆序
给定一个32有符号整数，在逆序后的数字溢出时，返回0，否则返回逆序后的数字。
**例如：**
当 x = 123时，返回值为321。
```
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
}
```

**解题思路**

这道题，leetcode给出的难易程度是容易。不过对于不熟悉JavaScript api的前端工程师来说，难度目测不小，步骤如下：

- 实现一个方法`isLeage`，对于任意的`x`以及逆序后的数字，都能判断数字是否合法


- 接下来的步骤
	- 将数字转成字符串，例如	`String`构造器，`+`字符串连接符，`toString`方法，`toFixed`方法，如果遇到`x`为负数，将负数去绝对值，同时设置一个标志量`isNegative`，并且将`isNegative`的值设置为true
，[可以参考这里](http://stackoverflow.com/questions/5765398/whats-the-best-way-to-convert-a-number-to-a-string-in-javascript)
	- 利用字符串的`split`方法将字符串分割成单个字符组成的数组

	
	- 利用数组的`reverse`方法来将数组逆序

	
	- 利用数组的`join`方法将数组组合成字符串

	
	- 将字符串变成数字，例如`Number`构造器，`parseInt`方法，`-`运算符

	
然后，我们写一下完整的程序：
```
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    var positiveMaxInteger = 2147483647;
    var negativeMaxInteger = -2147483648;
    var isNegative = false;
    var result = 0;
    var isLegal = function(x) {
        return x <= positiveMaxInteger && x >= negativeMaxInteger;
    }
    if(!isLegal(x)) return 0;
    if(x < 0){
        isNegative = true;
        x = 0 - x;
    }
    result = parseInt(String(x).split('').reverse().join(''));
    result = isNegative ? 0 - result : result;
    return isLegal(result) ? result : 0
};
```
上面这种写法十分讨巧，好处是利用JavaScript语言数组、字符串的内置api，所以实现得十分简洁


