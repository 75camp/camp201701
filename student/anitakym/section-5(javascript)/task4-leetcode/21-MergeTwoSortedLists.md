# 21 Merge Two Sorted Lists
Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

###解题思路
先拆成一个个节点，然后进行处理，等放到一个数组里面后，先排序，再添加指针。

<pre>
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
var mergeTwoLists = function(l1, l2) {
      var ans = [];
  while (l1) {
    ans.push(new ListNode(l1.val));
    l1 = l1.next;
  }

  while (l2) {
    ans.push(new ListNode(l2.val));
    l2 = l2.next;
  }

  ans.sort(function(a, b) {
    return a.val - b.val;
  });

  if (!ans.length) return null;
  for (var i = 0, len = ans.length; i < len - 1; i++)
    ans[i].next = ans[i + 1];

  return ans[0];

};
</pre>