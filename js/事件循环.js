// // await 是同步，但是会阻塞后面的代码执行。会丢进去微任务队列，先进先出
// // console.log('1');
// // setTimeout(function () {
// //   console.log('2');
// //   new Promise(function (resolve) {
// //     console.log('4');
// //     resolve();
// //   }).then(function () {
// //     console.log('5')
// //   })
// // })

// // new Promise(function (resolve) {
// //   console.log('7');
// //   resolve();
// // }).then(function () {
// //   console.log('8')
// // })

// // setTimeout(function () {
// //   console.log('9');
// //   new Promise(function (resolve) {
// //     console.log('11');
// //     resolve();
// //   }).then(function () {
// //     console.log('12')
// //   })
// // })

// //   console.log('setTimeout');
// //  script start async1 start async2 start async2 promise async1 end promise1 script end 2 3 
// // https://juejin.cn/post/6941023062833758222#heading-9
// // console.log('第二题');
// console.log('script start')
// /****
//  * script start
//  * async2 end
//  * Promise
//  * script end
//  * async2 end1
//  * promise1
//  * promise4
//  * async1 end
//  * promise2
//  * promise3
//  * setTimeout
//  */


async function async2() {
  console.log('async2 end')
  return Promise.resolve().then(() => {
    console.log('async2 end1')
  })
}

async function async1() {
  await async2()
  //1. 进行转换 ->
  new Promise(resolve => resolve(async2())).then(() => {
    console.log('async1 end')
  })
}

async1()

// async2 end async2 end1  async1 end


// //2. 进行转换 ->

// async2 end  Promise  script end  async2 end1
//  function async2() {
//   console.log('async2 end')
//   return Promise.resolve().then(() => {
//     console.log('async2 end1')
//   })
// }
//    async2()

// setTimeout(function () {
//   console.log('setTimeout')
// })

// // 有多个 .then 只先把第一个 .then丢进微任务队列
// new Promise(resolve => {
//   console.log('Promise')
//   resolve()
// })
//   .then(function () {
//     console.log('promise1')
//   })
//   .then(function () {
//     console.log('promise2')
//   })
//   .then(function () {
//     console.log('promise3')
//   })
// Promise.resolve().then(function () {
//   console.log('promise4')
// })

// console.log('script end')

