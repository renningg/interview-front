// 下面是一个简单的示例，展示如何使用 Proxy 对象创建响应式数据：

// 目标对象
const data = {
  name: 'Alice',
  age: 25
};

// 创建一个 Proxy 对象
const reactiveData = new Proxy(data, {
  // 拦截 get 操作
  get(target, key) {
    console.log('访问了属性：', key);
    return target[key];
  },
  // 拦截 set 操作
  set(target, key, value) {
    console.log('设置属性：', key, '为', value);
    target[key] = value;
  }
});


console.log(reactiveData.name); // 访问了属性：name，输出 Alice

reactiveData.age = 26; // 设置属性：age 为 26
console.log(reactiveData.age); // 访问了属性：age，输出 26
// 在上述示例中，我们创建了一个 Proxy 对象 reactiveData 来代理 data 对象。Proxy 的第一个参数是目标对象，第二个参数是一个处理程序对象，用于拦截并自定义对目标对象的操作。

// 在处理程序对象中，我们定义了 get 和 set 方法来拦截对响应式数据的读取和设置操作。当我们访问 reactiveData.name 属性时，会触发 get 方法，并输出相应的日志；当我们设置 reactiveData.age 属性时，会触发 set 方法，并输出相应的日志。

// 通过使用 Proxy 对象，Vue.js 在内部实现了响应式数据。当我们在 Vue 组件中使用 data 对象时，Vue 会将其转换为 Proxy 对象，并自动拦截和追踪对数据的访问和修改，以便及时地更新视图。

