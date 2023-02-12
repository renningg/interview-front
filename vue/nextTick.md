
    // https://blog.csdn.net/qq_40992225/article/details/126472625?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166893164916800182775707%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166893164916800182775707&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-126472625-null-null.142^v65^opensearch_v2,201^v3^control_2,213^v2^t3_esquery_v3&utm_term=nexttick&spm=1018.2226.3001.4187
    //     答题思路
    //     nextTick是做什么的 ?
    //     为什么需要它呢 ?
    //     开发时何时使用它 ? 抓抓头，想想你在平时开发中使用它的地方
    //     下面介绍一下如何使用nextTick
    //     原理解读，结合异步更新和nextTick生效方式，会显得你格外优秀
    //     回答范例:
    //     nextTick是等待下一次DOM更新刷新的工具方法。
    //    （其实一句话就可以把$nextTick这个东西讲明白：就是你放在 $ nextTick 当中的操作不会立即执行，
    //      而是等数据更新、DOM更新完成之后再执行，这样我们拿到的肯定就是最新的了。
    //      再准确一点来讲就是 $nextTick方法将回调延迟到下次DOM更新循环之后执行。（看不懂这句人话的，可以看上面）

    //     Vue有个异步更新策略，意思是如果数据变化，Vue不会立刻更新DOM，而是开启一个队列，把组件更新函数保存在队列中，
    //    在同一事件循环中发生的所有数据变更会异步的批量更新。这一策略导致我们对数据的修改不会立刻体现在DOM上，
    //    此时如果想要获取更新后的DOM状态，就需要使用nextTick。

    //     开发时，有两个场景我们会用到nextTick

    //     created中想要获取DOM时;
    //     响应式数据变化后获取DOM更新后的状态，比如希望获取列表更新后的高度。
    //     nextTick类型

    //     function nextTick(callback?: () => void): Promise<void>

    //     所以我们只需要在传入的回调函数中访问最新DOM状态即可，或者我们可以await nextTick()方法返回的Promise之后做这件事。

    //     在Vue内部，nextTick之所以能够让我们看到DOM更新后的结果，是因为我们传入的callback会被添加到队列刷新函数(flushSchedulerQueue)的后面，
    //      这样等队列内部的更新函数都执行完毕，所有DOM操作也就结束了，callback自然能够获取到最新的DOM值。
    //     我们可以看一下官方的案例：

   <script>
     import { nextTick } from 'vue'

    export default {
      data() {
        return {
          count: 0
        }
      },
      methods: {
        async increment() {
          this.count++

          // DOM 还未更新
          console.log(document.getElementById('counter').textContent) // 0

          await nextTick()
          // DOM 此时已经更新
          console.log(document.getElementById('counter').textContent) // 1
        }
      }
    }
   </script>


    // <template>
    //   <button id="counter" @click="increment">{{ count }}</button>
    // </template>

    // 给了一个count，想要在界面中绑定展示。一开始是0，如果用户点了increment，希望这个count能够++，
    // 我们希望界面中能够变成1，可是在紧接着的console.log中你会发现它并没有更新，结果仍然为0，并不是1，
    // 那么怎么输出1呢？await nextTick()，后面再输出结果就是1了。
    // 为什么会这样呢？这就是nextTick()带给我们最关键的东西了。
    // 说白了，就是nextTick()会返回一个promise，未来在异步的方式再来调用我们这行代码。
    // 也就是说nextTick()下的console.log将来执行的时候我们的DOM已经更新了。
    // 还有一种方式就是nextTick()中间加一个回调函数，在回调函数中输出我们的console.log里面的那一行代码。这样也是可以的。


    //     面试版
    //     说说nextTick吧
    //     nextTick：在下次DOM更新循环结束之后执行延迟回调。

    //     nextTick知道吗？
    //     这句话扩展开来说，就是由于Vue中DOM更新是「异步执行」的，即修改数据时，视图不会立即更新，
    //     而是会监听数据变化，并缓存在同一事件循环中，等同一数据循环中的所有数据变化完成之后，再统一进行视图更新。
    //     简单概括，vue中的nextTick主要用于处理数据动态变化后，DOM还未及时更新的问题，用nextTick可以获取数据更新后最新dom的变化。

    //     在项目中什么时候用呢 ?
    //       比如，当我们需要在生命周期的created()函数进行一些DOM操作的时候一定、
    //       要把相关代码放在Vue.nextTick()的回调函数中。
    //       原因: 在created钩子函数中，DOM还未进行任何渲染，此时进行DOM操作是没用的，所以如果要在这里操作dom,
    //       一定要将相关js代码放进 Vue.nextTick回调函数中。又或者，在数据变化后要执行某个动作，
    //     而这个动作需要使用随数据变化而改变的DOM结构的时候，也需要把相关逻辑写入Vue.nextTick()回调函数中。

    //     $nextTick既然把它传入的方法变成微任务了，那它和其它微任务的执行顺序是怎样的呢？
    //     这简单来说就是谁先挂载Promise对象的问题，在调用 $nextTick方法时就会将其闭包内部维护的执行队列挂载到Promise对象，
    //     在数据更新时Vue内部首先就会执行 $nextTick方法，之后便将执行队列挂载到了Promise对象上，
    //     其实在明白Js的Event Loop模型后，将数据更新也看做一个 $nextTick方法的调用，
    //     并且明白 $nextTick方法会一次性执行所有推入的回调，就可以明白执行顺序的问题了。

 # $nextTick和nextTick区别
   -- $nextTick和nextTick区别就是nextTick多了一个context参数，用来指定上下文。
      但两个的本质是一样的，$nextTick是实例方法，nextTick是类的静态方法而已；
      实例方法的一个好处就是，自动给你绑定为调用实例的this罢了。

<script>
  // src/core/util/next-tick.js
let timerFunc

// 定义异步方法，优雅降级，依次为 Promise、MutationObserver、setImmediate、setTimeout
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    timerFunc = () => {
        p.then(flushCallbacks)
        if (isIOS) setTimeout(noop)
    }
    isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
    let counter = 1
    const observer = new MutationObserver(flushCallbacks)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
        characterData: true
    })
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    }
    isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}

function flushCallbacks () {
    pending = false
    // 拷贝回调数组
    const copies = callbacks.slice(0)
    // 清空回调
    callbacks.length = 0
    // 遍历执行回调
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

export function nextTick (cb?: Function, ctx?: Object) {
    let _resolve
    // 将回调函数 push 到 callbacks 数组
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx)
            } catch (e) {
                handleError(e, ctx, 'nextTick')
            }
        } else if (_resolve) {
            _resolve(ctx)
        }
    })
    // 多次调用 nextTick，只会执行一次，等到 callbacks 清空之后再变为 false
    if (!pending) {
        pending = true
        timerFunc()
    }
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}

</script>

