// 实现原理：递归 + Promise.all()

// 创建任务队列
const delay = (delayTime) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(delayTime)
    }, delayTime);
  })
}
// tasks：数组，数组包含很多方法，每一个方法执行就是发送一个请求「基于Promise管理」
let tasks = [
  () => delay(100),
  () => delay(800),
  () => delay(900),
  () => delay(1003),
  () => delay(1004),
  () => delay(2005),
]

// tasks为任务队列，pool为每次并发的数量
function createRequest(tasks, pool) {
  pool = pool || 5
  let results = []
  let together = new Array(pool).fill(null)
  let index = 0
  together = together.map(() => {
    return new Promise((resolve, reject) => {
      // 创建递归函数
      const run = () => {
        if (index >= tasks.length) {
          resolve()
          return;
        }
        let old_index = index
        let task = tasks[index++]
        task()
          .then(res => {
            results[old_index] = res
            run();
          })
          .catch(err => reject(err))
      }
      // 执行递归函数
      run()
    })
  })
  return Promise.all(together).then(() => results)
}

createRequest(tasks, 5)
  .then(res => {
    console.log('成功-->', res);
  })
  .catch(err => console.log('失败-->', err))

