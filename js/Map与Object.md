# 共同点：
    都是键值对的动态集合，支持增加删除键值对

# 不同点：
  1. 构造方式
    Object：
    const o = new Object(); // 构造方法
    const o2 = Object.create();
    const obj = {'a': '1'}
    Map:
    const o = new Map(); // 构造方法


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

Vue响应式源码使用WeakMap来保存对象和对应的依赖关系。
在Vue响应式中，一个对象被作为依赖项时，它将被添加到一个WeakMap实例中，这个WeakMap实例用于追踪哪些对象依赖于哪些属性。当一个属性的值发生变化时，这个WeakMap实例就会去通知依赖于这个属性的对象，让它们进行相关的更新。最终，WeakMap的作用是提高Vue响应式的更新性能，避免不必要的重复更新。
