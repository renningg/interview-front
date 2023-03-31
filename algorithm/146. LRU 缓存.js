/**
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
    实现 LRUCache 类：
    LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
    int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
    void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；
    如果不存在，则向缓存中插入该组 key-value 。
    如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
    函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 * 
 */

/**
 * 整体思路：
 *    利用 Map 的顺序插入：
 *    从 Map 中取值时，先删除，再重新存值，确保经常用到的值，保存在队列尾
 *    在 Map 中存值时，先判断 Map 的大小是否超过 capacity，超过就先删除队首的元素，删完再存
 * 
 *  
 **/



/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.myMap = new Map()
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function (key) {
  if (this.myMap.has(key)) {
    let value = this.myMap.get(key)
    this.myMap.delete(key)
    this.myMap.set(key, value)
    return this.myMap.get(key)
  } else return -1;
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function (key, value) {
  if (this.myMap.has(key)) {
    this.myMap.delete(key)
  }
  if (this.myMap.size >= this.capacity) {
    this.myMap.delete(this.myMap.keys().next().value)
  }
  this.myMap.set(key, value)
};

// let myMap = new Map()
// myMap.set(1,"11")
// myMap.set(2,"22")
// myMap.set(3,"33")
// console.log(myMap.keys());
// console.log(myMap.keys().next());
// console.log(myMap.keys().next().value);

//https://leetcode.cn/problems/lru-cache/solutions/260362/bu-yong-yu-yan-nei-jian-de-map-gua-dang-feng-zhuan/
class ListNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.hash = {}
    this.count = 0
    this.dummyHead = new ListNode()
    this.dummyTail = new ListNode()
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }

  get(key) {
    let node = this.hash[key]
    if (node == null) return -1
    this.moveToHead(node)
    return node.value
  }

  put(key, value) {
    let node = this.hash[key]
    if (node == null) {
      if (this.count == this.capacity) {
        this.removeLRUItem()
      }
      let newNode = new ListNode(key, value)
      this.hash[key] = newNode
      this.addToHead(newNode)
      this.count++
    } else {
      node.value = value
      this.moveToHead(node)
    }
  }

  moveToHead(node) {
    this.removeFromList(node)
    this.addToHead(node)
  }

  removeFromList(node) {
    let temp1 = node.prev
    let temp2 = node.next
    temp1.next = temp2
    temp2.prev = temp1
  }

  addToHead(node) {
    node.prev = this.dummyHead
    node.next = this.dummyHead.next
    this.dummyHead.next.prev = node
    this.dummyHead.next = node
  }

  removeLRUItem() {
    let tail = this.popTail()
    delete this.hash[tail.key]
    this.count--
  }

  popTail() {
    let tail = this.dummyTail.prev
    this.removeFromList(tail)
    return tail
  }
}

// 作者：笨猪爆破组
// 链接：https://leetcode.cn/problems/lru-cache/solutions/260362/bu-yong-yu-yan-nei-jian-de-map-gua-dang-feng-zhuan/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。