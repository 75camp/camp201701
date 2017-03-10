#14 longest common prefix
Write a function to find the longest common prefix string amongst an array of strings.

###解题思路
因为是找最长的共同前缀，可以横向，纵向两种方法。
先纵向的比较：

<pre>
var longestCommonPrefix = function (strs) {
    if (strs[0] === '' || strs.length === 0) return '';

    let ans = '';
    for (let i = 0; i < strs[0].length; i++) {
        let cur = strs[0][i];
        for (let j = 0; j < strs.length; j++) {
            if (strs[j][i] !== cur || !strs[j][i] || strs[j] === '') return ans;
        }
        ans += cur;
    }
    return ans;
};
</pre>


还可以用Array.reduce（）来方便解答。


<pre>
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) {
        return '';
    }
    return strs.reduce(function (prev,next) {
        var i = 0;
        while (prev[i]&&next[i]&&prev[i]===next[i]) {
            i++;
        }
        return prev.slice(0,i);
    })
};
</pre>



###官方答案
有四个解题思路：

Quick Navigation
Solution

* (Horizontal scanning)
* (Vertical scanning)
* (Divide and conquer)
* (Binary search)


其中纵向的扫描用了charAt();