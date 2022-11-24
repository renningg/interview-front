mixins 用于混入对象
    作用：
        更高效的实现组件内容复用
        将组件内部data，methods等与父组件相应内容进行合并
        相当于在引入后，父组件的各种属性，方法都被扩充了

    本质：
        就是JS的深拷贝
        对 “对象”的值的传递，复制，合并

    注意：
        数据，对象的合并，以组件为优先
<script>
    export const mixinsObj = {
        data(){
           return {
             msg:"什么是成长"
           }
        },
        methods: {
            const test = () =>{
                console.log("什么是成长")
            }
        }
    }
</script>

在Vue文件中
mixins:[mixinsObj]，即引入混入对象, 以组件为优先