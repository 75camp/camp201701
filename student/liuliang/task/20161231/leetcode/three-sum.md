##三个数字
给定一个长度为n的数组S，从数组S中找出能够满足a + b + c = 0条件三个元素(a，b，c)，同时保证a，b，c唯一。

**例如：**
当 `S ＝ [-1, 0, 1, 2, -1, -4]`，返回值为`[[-1, 0, 1],[-1, -1, 2]]`
```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
}
```

**解题思路**

针对这道题，我没有好的办法，就只能用递归来实现。这样就能很好的解释，为啥leetcode给出超时的评判啦，步骤如下：


- 实现一个方法`findThirdNumber`，找出在数组的位置处于`i`、`j`之间，且满足上述三个数字（分别是`numsCopy[i]`、`numsCopy[m]`、`numsCopy[j]`）相加等于0的数字`numsCopy[m]`，分别对i、j进行加一以及减一操作，递归调用`findThirdNumber`。（ps：numsCopy数组其实是对nums数组正排序的副本）


- 实现一个方法`isArrayValueEqual`，用于保证`a`、`b`、`c`的唯一性

然后，我们写一下完整的程序：
```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    var numsCopy = nums.slice(0).sort(function(v1,v2){return v1-v2});
    var arr = [];
    var isExist = false;
    var isArrayValueEqual = function(a, b){
        if(a.length !== b.length) return false;
        for(var i = 0, length = a.length; i < length; i++){
            if(a[i] !== b[i]) return false;
        }
        return true;
    };
    var findThirdNumber = function(i, j, arr){
        if(i <= j){
            for(var m = i + 1; m < j; m++){
                if(numsCopy[m] + numsCopy[i] + numsCopy[j] === 0){
                    isExist = false;
                    for(var n = 0; n < arr.length; n++){
                        if(isArrayValueEqual(arr[n],[numsCopy[i],numsCopy[m],numsCopy[j]])){
                            isExist = true;
                            break;
                        }
                    }
                    if(!isExist) arr.push([numsCopy[i], numsCopy[m], numsCopy[j]]);
                }
            }
            findThirdNumber(i + 1, j, arr);
            findThirdNumber(i, j - 1, arr);
        }
    };
    findThirdNumber(0, numsCopy.length - 1, arr);
    return arr;   
};
```

