// 在调用函数时，浏览器每次都会传递进两个隐含的参数:
// 1.函数的上下文对象this

// 2.封装实参的对象arguments


// 什么是：arguments
// 1.arguments是一个类数组对象,它也可以通过索引来操作数据，也可以获取长度
// 在调用函数时，我们所传递的实参都会在arguments中保存
// arguments . length可以用来获取实参的长度

// 2.我们即使不定义形参，也可以通过arguments来使用实参，只不过比较麻烦
// arguments [0]表示第一个实参
// arguments [1]表示第二个实参

// 3.它里边有一个属性叫做callee
// 这个属性对应一个函数对象，就是当前正在指向的函数的对象


function a() {
  function b() {
    console.log([...arguments]);
  }
  b()
}
a(123,456,789)

function aa(ctx, ...args) {
  let bb = () => {
    console.log(arguments);
    let test = [...arguments].splice(1);
    console.log(test);
    console.log( ...args);
  }
  bb()
}

aa(123,456,789)


let arr = [1,2,3,4,5,6]
arr.splice(1)
console.log(arr);
// let arr1 = [1,2,3,4,5,6]
// let newArr = arr1.slice(1)
// console.log(newArr);