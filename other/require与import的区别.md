require/exports
<script>
  // module.js
    let counts = 1;
    function sayHello() {
        alert(`"hello , ${counts}`)
    }

    setTimeout(() => {
    counts += 2
    }, 3000);

    module.exports = {counts, sayHello};
</script>

<script>
    // index.js
    const { counts, sayHello } = require('./module.js');
    
    // 注意此处的代码结果
    const click = () => {
        console.log('counts: ', counts) // 每次点击事件，打印的 counts 始终为 1
        sayHello(); // 1  ==》 3秒钟后 =>> 3
    }

    ...
    <!-- 此处counts始终是 1 -->
    <p>import {counts}</p> 
    <Button type="primary" onClick={click}>require </Button>
</script>

结果分析：在源文件中更改变量的值，通过 require 引入 counts 的变量，拿到的值始终是初始化的值

import/export
<script>
  // module.js
    let counts = 1;
        function sayHello() {
        alert(`"hello , ${counts}`)
    }
    setTimeout(() => {
        counts += 2
    }, 3000);
    export { counts, sayHello };
</script>

<script>
  // index.js
    import { counts, sayHello } from './module.js';
    
    // 注意此处的代码结果
    const click = () => {
        console.log('counts: ', counts) // 初始为 1， ==》 3秒钟后 =>> 3
        sayHello(); // 初始为 1， ==》 3秒钟后 =>> 3
    }

    ...
    <!-- 此counts处始终是 1 -->
    <p>import {counts}</p> 
    <Button type="primary" onClick={click}>require </Button>
</script>

# 一般情况下，node中的模块化标准是CommonJs
#  要想使用ES模块化，可以采用以下两种方案
# (1) 使用mjs作为扩展名
# (2) 修改package.json将模块化规范设置为ES模块
#     当我们设置"type":"module" 当前项目下所有的js文件都默认使用ES module

# 通过ES模块化，导入的内容都是常量。常量不可被修改，但是常量的对象可以被修改
# ES模块都是运行在严格模式下的
# ES模块化，在浏览器中同样支持，但是通常不会直接使用，通常会结合打包工具使用

结果分析：通过 import 引入 counts 的变量，在源文件中修改变量的值后，引入拿到的变量值也会改变。

require和import的区别
1，导入require 导出 exports/module.exports 是 CommonJS 的标准，通常适用范围如 Node.js
2，import/export 是 ES6 的标准，通常适用范围如 React
3，require 是赋值过程并且是运行时才执行，也就是同步加载
4，require 可以理解为一个全局方法，因为它是一个方法所以意味着可以在任何地方执行。
5，import 是解构过程并且是编译时执行，理解为异步加载
6，import 会提升到整个模块的头部，具有置顶性，但是建议写在文件的顶部。
7，commonjs 输出的，是一个值的拷贝，而es6输出的是值的引用；
8，commonjs 是运行时加载，es6是编译时输出接口；
9，import有利于tree-shaking（移除JavaScript上下文中未引用的代码），require对tree-shaking不友好。

require和import的性能
require 的性能相对于 import 稍低。
因为 require 是在运行时才引入模块并且还赋值给某个变量，而 import 只需要依据 import 中的接口在编译时引入指定模块所以性能稍高

import 虽然是 es6 中的语法，但就目前来说，所有的引擎都还没有实现import。2022-09-28查询
我们在 node 中使用 babel 支持ES6（在 node 当中，比如 node.js 代码，也不能直接使用 import 来导入，
必须使用 babel 支持才能使用语法），实际上也是将 ES6 转码为 ES5 再执行，import 语法实际上会被转码为 require。
这也是为什么在模块导出时使 module.exports，在引入模块时使用 import 仍然起效，
因为本质上，import 会被转码为 require 去执行。

作者：lbug
链接：https://www.jianshu.com/p/03f09a3965b8
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
作者：forever_Mamba
链接：https://juejin.cn/post/7014011266796617736
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。