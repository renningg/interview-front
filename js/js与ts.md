首先，它们都是脚本语言。JavaScript 是轻量级的解释性脚本语言，可嵌入到 HTML 页面中，在浏览器端执行。而TypeScript 是JavaScript 的超集（ts是微软开发的开源编程语言），即包含JavaScript 的所有元素，能运行JavaScript 的代码，并扩展了JavaScript 的语法。（ts包含了js的库和函数，ts上可以写任何的js，调用任何的js库，可以在ts中使用原生js语法）。相比于JavaScript ，它还增加了静态类型、类、模块、接口和类型注解方面的功能，更易于大项目的开发。

区别：

1、TypeScript 引入了 JavaScript 中没有的“类”概念

2、TypeScript 中引入了模块的概念，可以把声明、数据、函数和类封装在模块中。

3、js没有重载概念，ts有可以重载

4、ts增加了接口interface、泛型、类、类的多态、继承等

5、ts对比js基础类型上，增加了 void/never/any/元组/枚举/以及一些高级类型

js有的类型：boolean类型、number类型、string类型、array类型、undefined、null

ts新增的类型：tuple类型（元组类型）、enum类型（枚举类型）、any类型（任意类型）

void类型（没有任何类型）表示定义方法没有返回值
never类型：是其他类型（包括null和undefined）的子类型，代表从不会出现的值这意味着声明never变量只能被never类型所赋值

js变量是没有类型的，即age=18，age可以是任何类型的，可以继续给age赋值为age=”aaa”
Ts有明确的类型(即：变量名:number(数值类型))  eg：let age: number = 18

ts需要静态编译，它提供了强类型与更多面向对象的内容。
ts最终仍要编译为弱类型，基于对象的原生的js，再运行。故ts相较java/C#这样天生面向对象语言是有区别和局限的
ts是由微软牵头主导的，其语法风格与概念主要来自C#，理解起来学过java的更容易理解（c#我没学过）
ts优势

1、类型化思维方式，使开发更严谨，能帮助开发人员检测出错误并修改，提前发现错误，减少改Bug时间

2、类型系统提高了代码可读性，便于开发人员做注释，维护和重构代码更加容易

3、补充了接口、枚举等开发大型应用时JS缺失的功能

【JS的类型系统存在"先天缺陷"，绝大部分错误都是类型错误(Uncaught TypeError)】

4、TypeScript工具使重构更变的容易、快捷。

5、类型安全功能能在编码期间检测错误，这为开发人员创建了一个更高效的编码和调试过程。
————————————————
版权声明：本文为CSDN博主「来两碗饭」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/chhpearl/article/details/125791516

TypeScript 的缺点
任何事物都是有两面性的， TypeScript 的弊端在于：

有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
集成到构建流程需要一些工作量
可能和一些库结合的不是很完美
————————————————
版权声明：本文为CSDN博主「张驰Zhangchi」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/terrychinaz/article/details/112428840

