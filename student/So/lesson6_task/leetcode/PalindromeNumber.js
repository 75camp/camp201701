/**
 * Created by So on 2017/3/3.
 */
/**
 * https://leetcode.com/problems/palindrome-number/?tab=Description
 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  let s=String(x)
  return s===s.split('').reverse().join('')
};