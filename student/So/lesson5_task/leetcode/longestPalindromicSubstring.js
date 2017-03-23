/**
 * Created by So on 2017/2/13.
 */
/*
 from https://leetcode.com/problems/longest-palindromic-substring/
 Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 */
/**
 * @param {string} s
 * @return {string}
 */
/**
let hash = {}
let currentPalindromeLen=0
var longestPalindrome = function (s) {
  //翻转如果两个字符串翻转前后相同就是回文
  let sReverse = s.split('').reverse().join('')
  let len = s.length
  let palindrome1, palindrome2
  let sub1 = s.slice(1)
  let sub2 = s.slice(0, len - 1)
  //已经找到的回文串长度大于剩下的字符串长度就直接返回一个空字符串，在后面会被筛掉
  if(currentPalindromeLen>=len){
    return ''
  }
  if (s === sReverse) {
    return s
  }
  // 字符串前面截去一个字符后是回文吗
  if (hash[sub1] === undefined) {
    palindrome1 = longestPalindrome(sub1)
    hash[sub1] = palindrome1
  } else {
    palindrome1 = hash[sub1]
  }
  // 字符串后面截去一个字符后是回文吗
  if (hash[sub2] === undefined) {
    palindrome2 = longestPalindrome(s.slice(0, len - 1))
    hash[s.slice(0, len - 1)] = palindrome2
  } else {
    palindrome2 = hash[sub2]
  }
  currentPalindromeLen=palindrome1.length > palindrome2.length ? palindrome1.length : palindrome2.length
  return palindrome1.length > palindrome2.length ? palindrome1 : palindrome2
}
 */

function longestPalindrome (s) {
  let n = s.length
  let pal = Array(n)
  let start, end
  for (let i = 0; i < n; i++) {
    pal[i] = Array(n)
  }
  // pal[i][j] 表示s[i...j]是否是回文串
  let maxLen = 0
  for (let i = 0; i < n; i++) {  // i作为终点
    let j = i    // j作为起点
    while (j >= 0) {
      if (s.charAt(j) === s.charAt(i) && (i - j < 2 || pal[j + 1][i - 1])) {
        pal[j][i] = true
        if (i - j + 1 > maxLen) {
          maxLen = i - j + 1
          start = j
          end = i
        }
      }
      j--
    }
  }
  return s.slice(start, end + 1)
}
console.time('test')
console.log(longestPalindrome("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"))
console.timeEnd('test')
