## 排序数组去重  
给你一个排序后的数组，然后在合适的位置去除重复的元素。也就是说，每个元素也只会出现一次，最后返回数组的长度。
⚠️不允许使用另一个数组，所以你必须在原数组上完成任务。

**例如：**
当数组`nums = [1,1,2]`，返回值为`2`，而且数组的前两个元素是`1`以及`2`。至于数组在新长度之后的元素是什么，者不太重要。
```
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
}
```

**解题思路**

针对这道题，先利用ES6中的Set去重，然后利用`Array.from`实现Set转为数组，最后通过length获取数组长度

然后，我们写一下完整的程序：
```
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    return Array.from(new Set(nums)).length;
};
```
最后的结果竟然是酱紫的😱，跪求解释

![image](https://cloud.githubusercontent.com/assets/8049878/23759570/1adf8e98-0528-11e7-9f1d-0ac736dc10f8.png)


