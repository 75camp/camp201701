>from https://leetcode.com/problems/longest-palindromic-substring/
  Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

* 我用的递归，感觉挺不错的了，可是还是报超时错误,len=1000 的时候
```javascript
/**
 * @param {string} s
 * @return {string}
 */
let hash = {}
var longestPalindrome = function (s) {
  let sReverse = s.split('').reverse().join('')
  let len = s.length
  let palindrome1, palindrome2
  let sub1 = s.slice(1)
  let sub2 = s.slice(0, len - 1)
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
  return palindrome1.length > palindrome2.length ? palindrome1 : palindrome2
}
```
* 好吧，换了种解法，速度还是慢
```javascript
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
```