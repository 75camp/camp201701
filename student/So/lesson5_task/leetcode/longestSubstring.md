>
* 方案一，用hash数组来映射，以字符的ASCII码值为index，记录每一轮有没有访问到该字符，访问到就说明重复，
跳出循环
```javascript
/**
 * 采用hash映射到ascii码
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function (s) {
  let arr = Array.from(s)
  let hash = Array(256)
  let len = arr.length
  let maxLen = 0
  let temp = 0
  for (let i = 0; i < len; i++) {
    temp = 0
    for (let j = i; j < len; j++) {
      // hash 里在第i轮访问到的值就用i填充
      if (hash[arr[j].charCodeAt()] !== i) {
        hash[arr[j].charCodeAt()] = i
        temp++
      } else {
        break
      }
    }
    maxLen = temp > maxLen ? temp : maxLen
    if (maxLen >= len - i) {
      return maxLen
    }
  }
  return maxLen
}
```
* 提交之后发现才打败了16%的人，于是知道还要优化。
这时我们来看一个字符串'asdfghdf',第一次查找的时候，我们找到子串'asdfgh'，遇到d的时候知道有重复了，于是我们查找有没有更长的
子串。方案一是外层循环直接加一从s开始搜索，但其实'sdfgh'，会被搜到，但明确可以知道比'asdfgh'短，原因就是
子串里的d和子串后面的d重复了，其实第二次我们完全可以安全的从d后面的f开始搜索。
```javascript
/**
 * 采用hash映射到ascii码
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function (s) {
  let arr = Array.from(s)
  let hash = Array(256)
  let len = arr.length
  let maxLen = 0
  let temp = 0
  let duplicateChar
  let subArr = []
  let jump = 0
  for (let i = 0; i < len; i++) {
    temp = 0
    subArr = []
    for (let j = i; j < len; j++) {
      // hash 里在第i轮访问到的值就用i填充
      if (hash[arr[j].charCodeAt()] !== i) {
        hash[arr[j].charCodeAt()] = i
        subArr.push(arr[j])
        temp++
      } else {
        duplicateChar = arr[j]
        break
      }
    }
    maxLen = temp > maxLen ? temp : maxLen
    if (maxLen >= len - i) {
      return maxLen
    }
    jump = subArr.indexOf(duplicateChar)  // 不用+1，因为还要在循环里i++
    i += jump
  }
  return maxLen
}
console.log(lengthOfLongestSubstring('dvdf'))
```
然而，优化完只打败13%了，苍天呐····
* 上网找了一下思路，发现可以用动态规划的思想来做，而且O(n)时间复杂度就可以解出。
因为我们每遍历到第i个字符的时候，就可以知道以i结尾的不重复子串的长度，而且还可以递推：
当i+1字符追加上去的时候，如果和lastIndex（之前最长子串的起点位置）到i的子串里没有重复
则lenArr[i+1]=lenArr[i]+1；否则lenArr[i+1]=i-lastPos(arr[i]),即从上次出现同样字符到现在的
长度，然后再吧lastIndex更新为lastPos(arr[i])+1
```javascript
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

```
这次打败75%了，不搞了。。。