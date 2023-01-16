/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let l3 = new ListNode(0)
  let cur = l3
  while (list1 != null && list2 != null) {
    if (list1.val <= list2.val) {
      cur.next = list1
      cur = cur.next
      list1 = list1.next
    } else {
      cur.next = list2
      cur = cur.next
      list2 = list2.next
    }
  }
  cur.next = list1 == null ? list2 : list1
  return l3.next
};

// 递归
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
