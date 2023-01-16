/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let l3 = new ListNode(0)
  let head = l3
  let carry = 0;
  while (carry || l1 || l2) {
    let x = l1 ? l1.val : 0
    let y = l2 ? l2.val : 0
    let res = x + y + carry
    carry = res >= 10 ? 1 : 0
    l3.next = new ListNode(res % 10)
    l3 = l3.next
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  return head.next
};