// 立即执行函数：函数的一种调用方式，声明完立即执行，调用完立即销毁，不会占用内存


// 闭包就是让外部可以访问到函数内部的变量，减少了全局变量的声明
// 保证内部变量的安全。但是会造成内存泄漏，增大内存消耗
var a = "全局参数"
function closePack() {
  var a = "局部参数";
  return {
    A: () => {
      console.log(a);
    }
  }
}
const fn = new closePack()
fn.A()
console.log(a);

// 立即执行函数 和 闭包 的共同优点就是减少了全局变量的使用

