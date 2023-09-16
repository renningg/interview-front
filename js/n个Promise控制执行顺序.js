// 使用回调函数 .then
a().then(res => {
  console.log(res)
  b().then(res => {
    console.log(res)
    c().then(res => {
      console.log(res)
      console.log(4)
    })
  })
})

// 使用 Promise .then 调用
Promise.resolve().then(() => a())
  .then(res => console.log(res))
  .then(() => b())
  .then(res => console.log(res))
  .then(() => c())
  .then(res => console.log(res))
  .then(() => console.log(4))

// 使用 async / await
async function log(a, b, c) {
  const args = [].slice.call(arguments, 0)
  for (let item of args) {
    let res = await item()
    console.log(res)
  }
  console.log(4)
}
log(a, b, c)


// 并发执行。使用 Promise.all() / Promise.allSeleted()
const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('sleep')
      resolve()
    }, 1000)
  })
}

const promiseList = [sleep, sleep, sleep]

Promise.all(
  promiseList.map(item => item())
).then(() => {
  console.log('Promise.all end', new Date().getTime())
})

// 还可以使用 async/await
async function fn() {
  const sleep1 = sleep1()
  const sleep2 = sleep2()
  const sleep3 = sleep3()
  // 下面三个写的顺序跟总共所花的时间无关，无论谁先谁后，总共时长一样
  const res1 = await sleep1
  const res2 = await sleep2
  const res3 = await sleep3
  console.log(res1, res2, res3)
  // 上面总体等同于：
  /**
  const sleep1 = new Promise((resolve) => {
    sleep1().then(resolve)
  })
  const sleep2 = new Promise((resolve) => {
    sleep2().then(resolve)
  })
  
  sleep1.then(()=>{
    sleep2.then(()=>{
      
    })
  })
  
  **/
}




