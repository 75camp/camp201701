### two sum
* form leetcode https://leetcode.com/problems/two-sum/
>Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 You may assume that each input would have exactly one solution, and you may not use the same element twice.
 Example:
 
     ```
     Given nums = [2, 7, 11, 15], target = 9,
    
     Because nums[0] + nums[1] = 2 + 7 = 9,
         return [0, 1].
     ```
 #### 最开始一眼看上去，最直接的方法就是2个for循环遍历寻找
 这样的话，时间复杂度是O(n^2),空间复杂度是O(n),因为只需要春夏数组nums就可以了

 ### 稍微改进一下就是先排序，然后从前后两个方向一起来寻找这个数组对。
  记住两个指针from=0，to=nums.length
  
```JavaScript
for (let i = 0; i < len; i++) {
    sum = nums[from] + nums[to]
    if (sum < target) {
      from++
      continue
    } else if (sum > target) {
      to--
    } else {
      // 返回的是原竖着中的位置，从两个方向查找，防止有重复数
      let start=oldNums.indexOf(nums[from])
      if(nums[from]==nums[to]){
        return [start, oldNums.indexOf(nums[to],start+1)]
      }else{
          return [start, oldNums.indexOf(nums[to])]
      }
    }
}

```
    这样的话，查找其实只需要O(n)的时间复杂度，但排序用了O(nlogn),对于空间复杂度，因为要求的是原数组的下标，所以多用了一个数组来存原数组，为2n，也是O(n),
    在数组足够大的时候效率才能有一定提高。