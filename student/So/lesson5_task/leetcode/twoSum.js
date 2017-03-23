/**
 *  https://leetcode.com/problems/two-sum/
 *  Given nums = [2, 7, 11, 15], target = 9,
 *  Because nums[0] + nums[1] = 2 + 7 = 9,
 *  return [0, 1].
 *
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // let map = {}   // 记录排序前的位置，这里根据题目必须是没有重复数字的，不然会覆盖
  // nums.forEach((item, index) => {
  //   if (map[item] === undefined) {
  //     map[item] = index
  //   } else {
  //     console.warn('duplicate num!')
  //   }
  // })
  let oldNums = JSON.parse(JSON.stringify(nums))
  nums=nums.sort(function (a,b) {
      return a-b
  })   // sort
  let len = nums.length, from = 0, to = len - 1 // 最开始要查找的起止位置，是两个指针，之后会移动，排除不可能的情况
  let sum  // 记录上一次的和，如果target在sum和lastSum之间，则可知无解
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
  return []
}

console.log(twoSum([3,3], 6))
