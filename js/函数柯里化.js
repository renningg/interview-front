
function add() {
  // 因为arguments是类数组结构，因此上述代码还需要进行改进，下面这行才是正确的
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
