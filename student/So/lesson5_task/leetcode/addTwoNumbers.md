


* 起初以为很简单，就是把数字提取出来在相加，然后再返回sum转成list就行了，于是有了版本1，但是到LeetCode里跑的时候，
有一个测试样例有61位，js里转为数字的时候就变成科学计数法了，结果就错了，而且这样位数再多，就会超过js数字表达的上限
了，所以必须换一个方案。
```javascript
    /**
     * Created by So on 2017/2/12.
     */
    /**
     * from https://leetcode.com/problems/add-two-numbers/
     */
    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    class ListNode {
      constructor (val) {
        this.val = val
        this.next = null
      }
    }
    
    var addTwoNumbers = function (l1, l2) {
      let num1 = getNum(l1)
      let num2 = getNum(l2)
      let sum = num1 + num2
      return numToList(sum)
    }
    function getNum (list) {
      let numArr = []
      while (list !== null) {
        numArr.unshift(list.val)
        list = list.next
      }
      return Number(numArr.join(''))
    }
    function numToList (num) {
      let numArr = Array.from(num.toString()).reverse()
      let head = new ListNode(Number(numArr.shift()))
      let currentNode = head
      let tempNode
      numArr.forEach((val) => {
        val = Number(val)
        tempNode = new ListNode(val)
        currentNode.next = tempNode
        currentNode = tempNode
      })
      return head
    }
    function arrToList (arr) {
      return numToList(Number(arr.join('')))
    }
    addTwoNumbers(arrToList([2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,9]), arrToList([5,6,4,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,9,9,9,9]))


```
* 方案2采用进位的方式，和列竖式原理一样，两两相加，进位就加到高位上，时间复杂度和空间复杂度都是O(n)
```javascript
    for (let i = 0; i < maxLen; i++) {
        arr1[i] = arr1[i] !== undefined ? arr1[i] : 0
        arr2[i] = arr2[i] !== undefined ? arr2[i] : 0   // 短的数字补0
        sum = (carry + arr1[i] + arr2[i]) % 10  // 加上上次的进位
        carry = Math.floor((carry + arr1[i] + arr2[i]) / 10)
        arr.push(sum)
      }
      if (carry !== 0) {
        arr.push(carry)
      }
```
