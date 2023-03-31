/**
 * 给你一个链表的头节点 head 和一个整数 val ，
 * 请你删除链表中所有满足 Node.val == val 的节点，
 * 并返回 新的头节点
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  // 先移除头节点
  while (head != null && head.val == val) {
    head = head.next
  }
  // 定义 cur 指针
  let cur = head;
  // 
  while (cur != null && cur.next != null) {
    if (cur.next.val == val) {
      // 满足条件就删除该节点
      cur.next = cur.next.next
    } else {
      // 不满足，指针继续往前走
      cur = cur.next
    }
  }
  return head;
};


// 使用虚拟头节点
var removeElements = function (head, val) {
  // 定义虚拟节点
  let vNode = new ListNode(0, head)
  // 定义 cur 指针
  let cur = vNode;
  while (cur.next != null) {
    if (cur.next.val == val) {
      // 满足条件就删除该节点
      cur.next = cur.next.next
    } 
    // 否则 cur 指针继续前移
    else cur = cur.next
  }
  return vNode.next
};
