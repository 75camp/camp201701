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
  let arr1 = listToArr(l1)
  let arr2 = listToArr(l2)
  let arr = []
  let len1 = arr1.length
  let len2 = arr2.length
  let carry = 0   // 进位
  let sum = 0   // 两数相加mod10后的值
  let maxLen = len1 > len2 ? len1 : len2
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

  //  return arrToList(arr)
  return arr
}
/**
 * translate list to array
 * @param list
 * @returns {Array}
 */
function listToArr (list) {
  let numArr = []
  while (list !== null) {
    numArr.push(list.val)
    list = list.next
  }
  return numArr
}
function arrToList (numArr) {
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
let arr = addTwoNumbers(arrToList([1]), arrToList([ 9, 9]))
console.log(arr)
