/**
 * Created by So on 2017/2/13.
 */
/**
 *from https://leetcode.com/problems/longest-substring-without-repeating-characters/?tab=Description
 *
 Given a string, find the length of the longest substring without repeating characters.

 Examples:

 Given "abcabcbb", the answer is "abc", which the length is 3.

 Given "bbbbb", the answer is "b", with the length of 1.

 Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */
/**
 * 采用hash映射到ascii码
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function (s) {
  let arr = Array.from(s)
  let hash = Array(256)
  let len = arr.length
  let lenArr = []
  let maxLen = 0
  let lastIndex = 0  // 上次指针停留的位置
  if (len === 0) {
    return 0
  }
  lenArr[0] = 1  // 初始值
  hash[arr[0].charCodeAt()] = 0    // 下标是字符ASCII码，值是arr的index
  maxLen = 1
  for (let i = 1; i < len; i++) {
    // 第i位置上的字符没有出现过 或 上次出现的位置在lastIndex之前，说明在子串中没有重复
    if (hash[arr[i].charCodeAt()] === undefined || hash[arr[i].charCodeAt()] < lastIndex) {
      lenArr[i] = lenArr[i - 1] + 1
    } else {
      lenArr[i] = i - hash[arr[i].charCodeAt()]   // 和上一次出现的距离
      lastIndex = hash[arr[i].charCodeAt()] + 1   // 更新最新指针为重复字符的下一位置
    }
    hash[arr[i].charCodeAt()] = i   // 记录 或 重新记录该字符最近一次出现的位置
    maxLen = lenArr[i] > maxLen ? lenArr[i] : maxLen
  }
  return maxLen
}
console.log(lengthOfLongestSubstring('cccssss'))
