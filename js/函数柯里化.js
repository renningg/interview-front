// 柯里化： 一种函数转化方法，是高阶函数(接收函数作为参数的函数)的一种，
// 它将一个接收多参数的函数转化为接收部分参数的函数。
// 柯里化后的函数只传递部分参数来调用，
// 并返回一个新的函数去处理剩余的参数，是逐步传参的过程。

// https://blog.csdn.net/double_sweet1/article/details/122786636?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167523389616800217025454%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=167523389616800217025454&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-122786636-null-null.142^v72^insert_chatgpt,201^v4^add_ask&utm_term=%E5%87%BD%E6%95%B0%E6%9F%AF%E9%87%8C%E5%8C%96&spm=1018.2226.3001.4187
function add() {
  // arguments是类数组结构
  let args = Array.prototype.slice.call(arguments);
  let inner = function () {
    args.push(...arguments); // arguments默认就为函数的参数，即使我们没有列出形参
    return inner;
  }

  // 改写toString方法的内容，输出sum的结果
  inner.toString = function () {
    return args.reduce((prev, cur) => {
      return prev + cur;
    });
  }
  return inner;
}
// parseInt 返回指定的整数
console.log(parseInt(add(1)(2)(3)(4)));
// 返回字符串类型的结果
console.log('' + add(1)(2)(3)(4));
console.log(1 == 1);
