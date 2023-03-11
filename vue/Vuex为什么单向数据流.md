1，Vuex为什么是单向数据流？
答：与双向数据流比，在单向数据流中，当你需要修改状态，完全重新开始走一个修改的流程。
    这限制了状态修改的方式，让状态变得可预测，容易调试。
    
    单向数据流的使用场景
    多个组件会共享状态时，共享状态和组件间（兄弟组件）通信变的不容易。
    我们把共享状态抽取出来，用单向数据流的方式会变得容易。
    单向数据流的好处在于所有的状态改变 (mutation)可追溯。

2，如何在组件中监听Vuex的数据变化
答：【1】先用mapState将全局数据映射为data中的数据，再用watch去监听数据是否变化
<script>
        // vuex中的state数据
    state: {
        count: 0
    },
        
    //  A组件中映射 state数据到计算属性
    computed: {
    //  this.$store.state.count
    // mapState       把全局  count 变成 可以直接使用的 数据
        ...mapState(['count'])
    }
    // A组件监听 count计算属性的变化
    watch: {
        // watch 可以监听 data 数据 也可以监听 全局 vuex数据
        count () {
        // 用本身的数据进行一下计数
        this.changeCount++
        }
    }
</script>
    【2】vuex中store对象本身提供了watch函数 ,可以利用该函数进行监听
    watch(fn: Function, callback: Function, options?: Object): Function
    响应式地侦听 fn 的返回值，当值改变时调用回调函数。fn 接收 store 的 state 作为第一个参数，其 getter 作为第二个参数。
    最后接收一个可选的对象参数表示 Vue 的 vm.$watch 方法的参数。
<script>
    created () {
        this.$store.watch((state, getters) => {
            return state.count
            }, () => {
            this.changeCount++
        })
    }
</script>

3，在mutation中能做action的异步操作吗？
答：如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。
    （不是不能写！是写了之后，state里的值vue devtool无法捕捉到变化！）



