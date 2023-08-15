// 防抖就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
// 防抖
const debounce = (fn, delay) => {
    let timer;
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this)
        }, delay)
    }
}
//节流就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率
// 节流
const throttle = (fn, delay) => {
    let lastTime = 0;
    return () => {
        let nowTime = Date.now();
        if (nowTime - lastTime > delay) {
            fn.call(this)
        }
        lastTime = nowTime;
    }
}


