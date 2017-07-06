##  大数相乘
给你两个以字符串展示的非负整数`num1`和`num2`，返回这两个数`num1`和`num2`的乘积。
###小贴士：
- `num1`和`num1`的数字长度均小于110。

- `num1`和`num2`里面只包含数字`0-9`。

- `num1`和`num2`均没有前导零。

- 不要使用任何操作大数运算的库，或者直接将字符串数字转成数字。

**例如：**
当`num1` = '1'、`num2` = '1'时，返回值为`1`
```
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
}
```

**解题思路**

针对这道题，我们可以按照乘法的运算规则，用一个乘数的每一位乘以另一个乘数，然后将所有中间结果按正确位置相加得到最终结果。可以分析得出如果乘数为A和B，A的位数为m，B的位数为n，则乘积结果为m+n-1位（最高位无进位）或m+n位（最高位有进位）

然后，我们写一下完整的程序：
```
var multiply = function(num1, num2) {
    if(num1 === '0' || num2 === '0') return '0';
    
    var num1Array = num1.split('');
    var num1Length = num1Array.length;

    var num2Array = num2.split('');
    var num2Length = num2Array.length;

    var result = Array(num1Length + num2Length).fill(0);
    var resultLength = result.length;

    var deleteFirstElement = function(str){
        return parseInt(str[0]) ? str : str.slice(1);
    };

    for(var i = 0; i < num1Length; i++) {
        for(var j = 0; j < num2Length; j++) {
            result[i + j] += num1Array[num1Length - 1 - i] * num2Array[num2Length - 1 - j];
        }
    }

    for(var k = 0; k < resultLength; k++) {
        if(result[k] >= 10) {
                result[k + 1] += parseInt(result[k] / 10);  
                result[k] %= 10;  
        }
    }

    return deleteFirstElement(result.reverse().join(''));
};
```


