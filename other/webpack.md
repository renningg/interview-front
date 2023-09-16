https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/119192986?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166933967316800192214726%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166933967316800192214726&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-119192986-null-null.142^v66^pc_rank_34_queryrelevant25,201^v3^control_2,213^v2^t3_esquery_v3&utm_term=webpack%E9%9D%A2%E8%AF%95%E9%A2%98&spm=1018.2226.3001.4187

# webpack是解决什么问题而生的?   
如果像以前开发时一个html文件可能会引用十几个js文件,而且顺序还不能乱，因为它们存在依赖关系，
同时对于ES6+等新的语法，less, sass等CSS预处理都不能很好的解决……，此时就需要一个处理这些问题的工具。

# webpack打包优化
  1. 优化搜索文件：缩小文件的搜索范围。配置resolve.alias，配置src的路径。较少使用相对路径
  2. 使用HappyPack开启多进程loader转换：
      Loader对文件的转换操作太耗时，JS是单线程模型，只能一个一个文件处理，
      通过HappyPack将任务分解为多个子进程，最后将结果发给主进程，并行处理。
  3. 使用ParalleUglifyPlugin  开启多进程压缩JS文件
  4. 开启模块热替换 HMR：只重新编译变化的模块
  5. 压缩资源(JS,CSS,图片)
  6. 开启Tree-Shaking
  7. 配置PublicPath
  8. 区分不同的开发环境/生产环境

2、webpack的工作原理?
分析项目结构，找到JavaScript模块及Sass，TypeScript等，并将其转换和打包为合适的格式供浏览器使用。
把一切都视为模块：不管是 css、JS、Image 还是 html 都可以互相引用，
通过定义 entry.js，对所有依赖的文件进行跟踪，将各个模块通过 loader 和 plugins 处理，然后打包在一起。

# 按需加载？
  打包过程中 Webpack 通过 Code Splitting 功能将文件分为多个 chunks，还可以将重复的部分单独提取出来作为 commonChunk，从而实现按需加载。把所有依赖打包成一个 bundle.js 文件，通过代码分割成单元片段并按需加载

# webpack的核心概念
  1. Entry：告诉webpack要使用哪个模块作为构建项目的起点，默认为./src/index.js
            进入入口起点后，webpack会将代码解析成AST语法树，webpack根据语法树找出有哪些模块和库是入口起点依赖的。每个依赖项随即被处理，最后输出到bundle的文件中。
  2. output ：出口，告诉webpack在哪里输出它打包好的代码以及如何命名，默认为./dist
  3. Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。
            Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
  4. Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
  5. Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
  6. Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，

# Loader机制的作用是什么？
webpack默认只能打包js文件，配置里的module.rules数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换打包成js。

注意：
use属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如css-loader?minimize中的minimize告诉css-loader要开启 CSS 压缩。

css-loader读取 合并CSS 文件
style-loader把 CSS 内容注入到 JavaScript 里
sass-loader 解析sass文件（安装sass-loader，node-sass）
postcss-loader自动添加浏览器兼容前缀（postcss.config配置）
url-loader将文件转换为base64 URI。
vue-loader处理vue文件。

# Plugin（插件）的作用是什么？常见Plugins？
Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。
plugins属性是一个数组，里面的每一项都是插件的一个实例，在实例化一个组件时可以通过构造函数传入这个组件支持的配置属性。

HtmlWbpackPlugin自动在打包结束后生成html文件，并引入bundle.js
cleanwebPackPlugin打包自动删除上次打包文件
ExtractTextPlugin插件的作用是提取出 JavaScript 代码里的 CSS 到一个单独的文件。

# 什么是bundle，什么是chunk，什么是module
bundle：是由webpack打包出来的文件
chunk：是指webpack在进行模块依赖分析的时候，代码分割出来的代码块
module：是开发中的单个模块

# gulp/grunt 与 webpack的区别是什么?
三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。
grunt和gulp是基于任务和流（Task、Stream）的。

类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。
webpack是基于入口的。

webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。

# sourceMap
  是一个映射关系，将打包后的文件隐射到源代码，用于定位报错位置
配置方式:
例如：devtool：‘source-map’
加不同前缀意义：

inline:不生成映射关系文件，打包进main.js

cheap: 1.只精确到行，不精确到列，打包速度快 2.只管业务代码，不管第三方模块

module：不仅管业务代码，而且管第三方代码

eval:执行效率最快，性能最好

最佳实践：
开发环境：cheap-module-eval-source-map
线上环境：cheap-mudole-source-map


# webpack如何配置多入口文件?
entry: { home: resolve(__dirname, "src/home/index.js"), about: resolve(__dirname, "src/about/index.js")}
用于描述入口的对象。你可以使用如下属性：

dependOn: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。

filename: 指定要输出的文件名称。

import: 启动时需加载的模块。

library: 指定 library 选项，为当前 entry 构建一个 library。

runtime: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。

publicPath: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址

# 理解 babel-preset-env
babel-preset-es2015: 可以将es6的代码编译成es5.
babel-preset-es2016: 可以将es7的代码编译为es6.
babel-preset-es2017: 可以将es8的代码编译为es7.
babel-preset-latest: 支持现有所有ECMAScript版本的新特性


# lazy loading（模块懒加载）
借助import()语法异步引入组件，实现文件懒加载：prefetch,preloading
webpack提倡多写异步代码，提升代码利用率，从而提升页面性能
先加载主业务文件，prefetch利用网络空闲时间，异步加载组件

import(/* webpackPrefetch: true / ‘LoginModal’);
preload和主业务文件一起加载，异步加载组件

import(/ webpackPreload: true */ ‘ChartingLibrary’);

# 什么是长缓存？在webpack中如何做到长缓存优化？
浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或者更新，都需要浏览器去下载新的代码，最方便和最简单的更新方式就是引入新的文件名称。

在webpack中，可以在output给出输出的文件制定chunkhash，并且分离经常更新的代码和框架代码，通过NameModulesPlugin或者HashedModulesPlugin使再次打包文件名不变。

# webpack-dev-server 和 http服务器的区别
webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，比传统的http服务对开发更加有效。