# 共同点：
    都是键值对的动态集合，支持增加删除键值对

# 不同点：
  1. 构造方式
    Object：
    const o = new Object(); // 构造方法
    const o2 = Object.create();
    const obj = {'a': '1'}
    Map:
    const o = new Object(); // 构造方法
    const o2 = Object.create();
    const obj = {'a': '1'}

  2. 健的类型：
    Object的健只能是 string, Symbol, 如果非 String, 会进行数据类型转换
    Map的健可以是任何类型，包括数组，对象，函数等。不会进行数据类型转换。
  3. 健的顺序：
    Object: key是无序的，不会按照添加的顺序返回
    Map: key 是有序的，按照插入的顺序返回。
  4. 长度的计算：
    Object：只能手动计算，通过 Object.keys() 或者 for...in循环统计
    Map：直接通过 size 属性访问
  5. 迭代器：
    Object 不具备迭代器机制
    Map 具备迭代器机制

# WeakMap WeakSet
   WeakMap WeakSet 只有四个方法可以用：get(),set(),has(),delete()
  1. WeakMap 是弱引用。当其键所指对象没有其他地方引用的时候，就会被垃圾回收机制回收掉
    WeakMap的健必须是 Object 类型或继承于 Object 的类型
   
  2. WeakSet 只能向 WeakSet 添加对象（不能是原始值）
