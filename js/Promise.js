let p1 = new Promise(resolve => {
  // setTimeout(resolve, 0, 1)//大家猜猜如果是这句，最后是什么结果
  resolve(1);
});
let p2 = new Promise((resolve, reject) => reject(2));
let p3 = 3;

//1，Promise.all() 方法接收一个promise的iterable类型（MDN）
// 只返回一个promise实例
// 当传入的参数promise全部成功时，最后的结果才会成功（成功的结果是所有的promise的成功的结果组成的数组），
// 只要有一个promise失败，all返回的实例就是一个失败的promise（失败的结果是传入的参数中的第一个失败的promise的结果）
let myAll = function (parr) {
  let result = [], //最后成功的结果
    count = 0, //累加器，与len比较判断是否全部成功了
    len = parr.length;
  return new Promise((resolve, reject) => {
    for (let p of parr) { //依次测试传入的参数（转化为promise）是否是成功的
      Promise.resolve(p).then(res => {
        result[count] = res; //成功就加入到结果中
        count++; //累加器加一
        if (count == len) { //如果相等，说明都成功了，可以走成功resolve
          resolve(res);
        }
      },
        err => {
          //只要有一个失败了，直接走失败reject
          reject(err);
        })
    }
  })
}


//2，Promise.race（比比谁先改变状态！）
// 特点：
// 传入的参数和返回的结果形式和all方法一样
// 区别：只要传入的promise有一个状态改变了，最后的结果就会立即改变
// 例如有一个成功，直接走race的resolve，如果有一个失败，直接走reject

let myRace = function (parr) {
  return new Promise((resolve, reject) => {
    for (let p of parr) { //一次检查
      Promise.resolve(p).then(resolve, reject); //只要是状态改变了就直接走对应的函数
      //也可以是这样
      //Promise.resolve(p).then(res => {
      //  	resolve(res);
      //},err=>{
      //	reject(err);
      //});
    }
  })
}

//3，Promise.any 正好和promise.all相反 
// 只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；
// 如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
Promise.myAny = function (parr) {
  let arr = []
  let count = 0
  return new Promise((resolve, reject) => {
    parr.forEach((item, i) => {
      Promise.resolve(item)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          arr[i] = err
          count++
          if (count == parr.length) reject(new Error('All promises were rejected'))
        })
    })
  })
}


// 4，Promise.allSettled
// 所有结果无论成功与否都会收集起来
Promise.myAllSettled = function (parr) {
  let arr = []
  let count = 0
  return new Promise((resolve, reject) => {
    parr.forEach((item, i) => {
      Promise.resolve(item)
        .then(res => {
          arr[i] = { status: 'fulfilled', value: res }
          count++
          if (count == parr.length) resolve(arr)
        })
        .catch(err => {
          arr[i] = { status: 'rejected', reason: err }
          count++
          if (count == parr.length) resolve(arr)
        })
    })
  })
}





