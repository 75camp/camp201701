/**
 * Created by So on 2017/2/13.
 */
/**
 * from https://leetcode.com/problems/median-of-two-sorted-arrays/
 There are two sorted arrays nums1 and nums2 of size m and n respectively.
 Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let len1 = nums1.length
  let len2 = nums2.length
  let len = len1 + len2
  let arr = []
  let median = 0
  for (let k = 0, i = 0, j = 0; k < len; k++) {
    if (i === len1) {
      arr = arr.concat(nums2.slice(j))
      break
    }
    if (j === len2) {
      arr = arr.concat(nums1.slice(i))
      break
    }
    if (nums1[i] <= nums2[j]) {
      arr.push(nums1[i])
      i++
    } else {
      arr.push(nums2[j])
      j++
    }
  }
  if (len % 2 === 0) {
    median = (arr[(len / 2) - 1] + arr[len / 2]) / 2
  } else {
    median = arr[(len - 1) / 2]
  }
  return Number(median.toFixed(5))
}
console.log(findMedianSortedArrays([1, 3], [2]))
