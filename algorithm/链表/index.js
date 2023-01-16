// 链表有两个属性：val,next;
// val为当前节点的值，next指向下一个节点

/***
 * 解决链表的问题，一般用快慢指针
 *    比如：快指针比慢指针快1步（题目：找到链表的中间节点）
 *          快指针比慢指针快n步（题目：删除倒数第n个节点）
 */
// 定义节点
class Node {
  constructor(val) {
    this.val = val;
    this.next = next;
  }
}
// 定义一个链表
class listNode {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  // 增加节点的方法
  append(val) {
    let node = new Node(val)
    if (!this.head) this.head = node
    let cur = this.head
    while (cur) {
      cur = cur.next
    }
    cur = node
    this.length++;
  }
  // 删除节点,并获得删除节点的值
  remove(index) {
    // 下标越界
    if (index > this.length || index < 0) return null
    // 双指针
    let cur = this.head
    let pre;
    let position = 0;
    if (index == 0) {
      this.head = cur.next
    } else {
      while (position < index) {
        position++
        pre = cur
        cur = cur.next
      }
      pre.next = cur.next
    }
    this.length--;
    return cur.val
  }
  // 插入节点的方法
  insert(index, val) {
    // 创建新节点
    let node = new Node(val)
    let cur = this.head
    let position = 0
    let pre;
    // 下标越界
    if (index > this.length || index < 0) return null
    // index = 0
    if (index == 0) {
      node.next = cur
      this.head = node
    } else {
      while (position < index) {
        position++
        pre = cur
        cur = cur.next
      }
      pre.next = node
      node.next = cur
      this.length++
    }
  }
  // 获取索引的方法
  indexOf(val) {
    let position = 0;
    let cur = this.head;
    while (cur) {
      if (cur.val = val) {
        return position
      }
      cur = cur.next
      position++
    }
    // 未找到索引
    return -1;
  }
  // 链表转字符串
  toString() {

  }
  // 获取链表的长度
  size() {
    return this.length;
  }
  // 判断链表是否为空
  isEmpty() {
    return this.length === 0
  }
}