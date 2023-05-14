https://www.jianshu.com/p/d67bc79976e6

前端模块规范有三种：CommonJs,AMD和CMD。
CommonJs用在服务器端，AMD和CMD用在浏览器环境
AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
AMD:提前执行（异步加载：依赖先执行）+延迟执行
CMD:延迟执行（运行到需加载，根据顺序执行）



CommonJS是一种模块化规范，最初是为了Node.js服务端JavaScript使用而设计的。它使用`require`和`exports`两个API来导入和导出模块。
- CommonJS是同步加载，也就是当一个模块需要依赖其他模块时，将会等待依赖的模块加载完后再执行当前模块。
- CommonJS适用于服务端JavaScript和一些非浏览器环境的JavaScript执行环境，比如Node.js，但在浏览器端使用会存在一些问题。

AMD（Asynchronous Module Definition）是另一种JavaScript模块化规范，其与CommonJS最大的不同是AMD是异步加载模块，避免了长时间阻塞JavaScript的执行。

- AMD适用于浏览器端JavaScript，其提供了异步加载的功能，从而避免了长时间阻塞JavaScript的执行。
- AMD使用`define`和`require`两个API分别用于定义和导入模块。

CMD（Common Module Definition）是一种相对比较简单的模块定义规范，它的出现是为了解决CommonJS在浏览器中不能异步加载的问题。

- CMD适用于浏览器端JavaScript，其与AMD一样提供了异步加载的功能，从而避免了长时间阻塞JavaScript的执行。
- CMD使用`define`和`require`两个API分别用于定义和导入模块，与AMD的不同之处是，CMD可以在模块内部再次使用`require`方法来在需要模块实际执行时再加载该模块。

综上所述，三者的异同点可以总结如下：
