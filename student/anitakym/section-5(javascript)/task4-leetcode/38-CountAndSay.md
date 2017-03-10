#38 Count and Say

The count-and-say sequence is the sequence of integers beginning as follows:
1, 11, 21, 1211, 111221, ...

1 is read off as "one 1" or 11.
11 is read off as "two 1s" or 21.
21 is read off as "one 2, then one 1" or 1211.
Given an integer n, generate the nth sequence.

Note: The sequence of integers will be represented as a string.

###解题思路
分两个方面处理这个问题：

1. 字符串的处理，先获得上一行的字符串，然后将其转换为数组，比较后一项和前一项是否相同，如果相同，则计数加一，不读出来，如果不同，则要读出来。
2. 因为后一行都依赖前一行，所以还需要一个循环，将上一行的值可以传给下一行。

所以两个for循环，然后一个判断语句处理是计数增一还是读出来。

<pre>
var countAndSay = function (n) {
    var str = "1";
    for (var i = 0; i < n; i++) {
        var arr = str.split("");
        str = "";
        count = 1;
        var len = arr.length;
        for (var j = 0; j < len; j++) {
            if (arr[j+1] !== arr[j]) {
                str += count + arr[j];
                count = 1;
            } else {
                count++;
            }
        }
    }
    return str;
};
</pre>