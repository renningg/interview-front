/**
 * promise常规用法：
 * 1、promise 通过 new 关键字调用，说明promise是一个类
 * 2、promise有三种状态，pending，fulfilled，rejected，状态只能从pending -> fulfilled 和 pending -> rejected，此过程是单向的，不可逆的
 * 3、promise状态的改变通过resolve和reject函数实现，这两个方法定义在原型上
 * 4、调用promise的时候会传入一个函数当作参数
 * 5、new promise之后生成的对象，可以调用then、finally和catch方法，这些方法定义在原型上
 * 6、then方法接收两个回调函数，一个成功回调，一个失败回调
 * 7、同一个promise对象可以同时调用多次then方法，因此then方法成功回调和失败回调是两个数组，存储多次调用then方法时传递的函数
 * 8、Promise.resolve和Promise.all因为 '.' 的调用方式，因此应该定义为静态方法
 * 
 */

//将promise状态声明成常量，方便复用
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/*
 * resolvePromise方法的作用是判断then方法接收的回调函数的返回值的类型，
 * 如果是普通值，直接调用  resolve（x）将返回值传递给promise2的then方法，
 * 如果是promise实例，则求出x的返回值，传递给promise2的then方法
 */
const resolvePromise = (promise2, x, resolve, reject) => {
  //promise2和x不能是同一个对象，是的话报错
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  //如果x是一个MyPromise的实例
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {//x是一个普通值
    resolve(x)
  }
}

class MyPromise {
  //调用new MyPromise时传入一个执行器函数，该执行器函数立即执行，并且执行器函数接收两个更改状态的函数，resolve和reject
  constructor(executor) {
    this.status = PENDING //状态初始化为pending
    this.value = undefined //成功返回值
    this.reason = undefined //失败返回值
    this.onResolvedCallback = [] //成功的回调队列
    this.onRejectedCallback = [] //失败的回调队列

    //箭头函数是为了在定义时绑定词法作用域中的this
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value

        //成功执行回调
        if (this.onResolvedCallback.length) {
          this.onResolvedCallback.forEach(fn => fn())
        }
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason

        //失败执行回调
        if (this.onRejectedCallback.length) {
          this.onRejectedCallback.forEach(fn => fn())
        }
      }
    }
    //try catch是为了捕获调用new Promise（）时抛出的异常
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  //then方法接收两个参数，一个成功回调，一个失败回调
  then(successCallback, failCallback) {
    // 在实际应用中then方法的成功回调和失败回调参数并不是必传的，当用户没有传参的时候，给参数设一个默认值
    successCallback ? successCallback : value => value
    failCallback ? failCallback : reason => { throw reason }
    let promise2 = new MyPromise((resolve, reject) => {
      //将then方法中接受的的回调函数的返回值保存在变量中，以便传递给promise2对象中的then方法
      let x
      //同步逻辑，成功回调
      if (this.status === FULFILLED) {
        //setTimeout方法将同步代码修改为异步代码，这样才能获取到promise2
        setTimeout(() => {
          //在这里用try catch是为了捕获then方法中抛出的异常
          try {
            x = successCallback(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      //同步逻辑，失败回调
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            x = failCallback(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      //异步逻辑
      if (this.status === PENDING) {
        //由于调用new promise时传入的执行器函数里异步操作，此时还没有返回结果，因此需要将回调函数暂存进回调队列中
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    //由于then可以链式调用，因此then方法返回一个promise对象
    return promise2
  }

  /**
* promise的then方法可以不传递失败回调函数，失败原因可以一直传递下去，最终可以被catch捕获到
* 在catch方法中的内部调用then方法，只传递失败回调方法即可
*/
  catch(failCallback) {
    return this.then(null, failCallback)
  }

  /**
   *  无论promise的状态是什么，都会执行finally方法，调用finally方法之后可以继续调用then方法，
   *  因此finally方法返回的是promise对象
   */
  finally(cb) {
    return this.then(value => {
      return MyPromise.resolve(cb()).then(() => value)
    }, reason => {
      return MyPromise.resolve(cb()).then(() => { throw reason })
    })
  }



  /**
   * resolve方法可以把一个传入的参数包装成MyPromise对象
   * resolve方法接收一个参数，如果该参数是一个MyPromise对象，则返回它本身，
   * 如果是一个普通值，则将该值用MyPromise包装返回
   */
  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
}
