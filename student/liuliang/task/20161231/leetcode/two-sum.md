##两个数字
给定一个整数数组，返回两数组元素之和加起来等于给定值的数组元素下标。
另外，你可能需要笃定：输入的每组数据，最后都只会对应一种解决方案，而且你也不会出现把相同的元素使用两次的情况。

**例如：**
当`nums = [2, 7, 11, 15]`，`target = 9`时，返回值为`[0, 1]`，这是因为nums[0] + nums[1] = 2 + 7 = 9。
```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
}
```

**解题思路**

针对这道题，我没有好的办法，步骤如下：

- 实现一个方法`isAllowNumberPushToArray`，判断添加的元素是否已存在数组中

- 实现一个方法`findArrayValue`，来找到满足条件的m

然后，我们写一下完整的程序：
```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var i,j,arr = [],numsCopy = nums.slice().sort(function(v1,v2){return v1-v2;});
    var isAllowNumberPushToArray = function(x,y,arr){
        return x === -1 || y === -1 || x + 1 !== y || arr.length === 0;
    };

    var findArrayIndexByIndexofMethod = function(arr,val){
        return arr.indexOf(val);
    };

    var findArrayValue = function(i,j,arr){
        var m = 0,n = 0,x = 0,y = 0;
        for(m=i,n=j;m<n;){
            if(numsCopy[m] + numsCopy[n] === target) {
                x = findArrayIndexByIndexofMethod(arr,numsCopy[m]);
                y = findArrayIndexByIndexofMethod(arr,numsCopy[n]);
                if(isAllowNumberPushToArray(x,y,arr)) arr.push(numsCopy[m],numsCopy[n]);
                m++;
                n--;
            }else if(numsCopy[m] + numsCopy[n] < target) {
                m++;
            }else{
                n--;
            }
        }     
    };

    var findArrayIndex = function(arr){
       var result = [];
       for(var i = 0;i < nums.length; i++){
           findArrayIndexByIndexofMethod(arr,nums[i]) >= 0 && result.push(i);
       }
       return result;
    };
    findArrayValue(0,numsCopy.length-1,arr);
    return findArrayIndex(arr);
};
```




