
  // <!-- https://blog.csdn.net/qq_42941302/article/details/109245356?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166890840816782428682936%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166890840816782428682936&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-109245356-null-null.142^v65^opensearch_v2,201^v3^control_2,213^v2^t3_esquery_v3&utm_term=async%20await&spm=1018.2226.3001.4187 -->

    // async/await是什么
    // async/await 是ES7提出的基于Promise的解决异步的最终方案。async/await 是消灭异步回调的终极武器
    // async
    // async是一个加在函数前的修饰符，被async定义的函数会默认返回一个Promise对象resolve的值。
    // 因此对async函数可以直接then，返回值就是then方法传入的函数。
    // async基础语法
    // async function fun0() {
    //   console.log(1);
    //   return 1;
    // }
    // fun0().then(val => {
    //   console.log(val) // 1,1
    // })

    // async function fun1() {
    //   console.log('Promise');
    //   return new Promise(function (resolve, reject) {
    //     resolve('Promise')
    //   })
    // }
    // fun1().then(val => {
    //   console.log(val); // Promise Promise
    // })

    // await
    // await 也是一个修饰符，只能放在async定义的函数内。可以理解为等待。

    // await 修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；

    // 如果不是Promise对象：把这个非promise的东西当做await表达式的结果。

    // async function fun() {
    //   let a = await 1;
    //   let b = await new Promise((resolve, reject) => {
    //     setTimeout(function () {
    //       resolve('setTimeout')
    //     }, 3000)
    //   })
    //   let c = await function () {
    //     return 'function'
    //   }()
    //   // console.log(a, b, c)
    // }
    // fun(); // 3秒后输出： 1 "setTimeout" "function"

    // function log(time) {
    //   setTimeout(function () {
    //     console.log(time);
    //     return 1;
    //   }, time)
    // }
    // async function fun() {
    //   let a = await log(1000);
    //   let b = await log(3000);
    //   let c = log(2000);
    //   console.log(a);
    //   console.log(1)
    // }
    // fun();
    // 立即输出 undefined 1
    // 1秒后输出 1000
    // 2秒后输出 2000
    // 3秒后输出 3000

    // async/await 的正确用法
    // 使用async/await获取成功的结果
    // 定义一个异步函数，3秒后才能获取到值(类似操作数据库)
    // function getSomeThing() {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('获取成功')
    //     }, 3000)
    //   })
    // }

    // async function test() {
    //   let a = await getSomeThing();
    //   console.log(a)
    // }
    // test(); // 3秒后输出：获取成功

    // 案例：异步加载图片
    //里面函数为AJAX，因此是异步任务
    let loadImg = (url) => {
      const p = new Promise((resolve, reject) => {
        let newImg = document.createElement("img")
        newImg.src = url
        newImg.onload = function () {
          resolve(newImg)
        }
        newImg.error = function () {
          reject(new Error('Could not load Image at url'))
        }
      })
      return p
    }

    //使用 async 和 await 的方法来写，立即执行函数
    (async function () {
      // loadImg(url1) 返回 promise 对象
      // await 可以拿到从 resolve 传递过来的 dom 对象
      const img1 = await loadImg(url1)
      document.body.appendChild(img1)

      const img2 = await loadImg(url2)
      document.body.appendChild(img2)
    })()