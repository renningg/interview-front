// Vue.extend(options): 基础Vue构造器。

// 参数是一个包含组件选项的对象。data选项是函数，为了保证引用类型的数据不乱来

// 原理：Vue.extend返回的是一个扩展实例构造器,也就是预设了部分选项的Vue实例构造器，但未曾实例化，
// 可以理解为创建一个子类，然后让它继承Vue身上的一些功能。

// 1，例如，我有一个弹窗组件

{/* <template>
    <div v-if="show" ref="modal" class="ek-modal_wrap">
        <div class="ek-modal-content">
            <div class="modal-title-wrap">
                <div class="modal-title">{{ title }}</div>
                <slot name="description"></slot>
            </div>
            <div class="modal-button">
                <a v-if="confirmVisible" class="contral-btn confirm-btn" href="javascript:;" @click="confirm">{{
                    confirmText
                }}</a>
            <a v-if="cancleVisible" class="contral-btn cancle-btn" href="javascript:;" @click="cancle">{{ cancleText }}</a>
    </div>
</div>
    </div >
  </template >

  <script>
  export default {
    data() {
      return {
        show: true,
        title: '', // 标题
        confirmText: '确定', // 确认文字
        confirmVisible: true, // 是否展示确认按钮
        onConfirm: () => { // 确认执行函数
          this.$emit('confirm')
        }, 
        cancleText: '取消', // 取消文字
        cancleVisible: true, // 是否展示取消按钮
        onCancle: () => { // 取消执行函数
          this.$emit('cancle')
        } 
      }
    },
    methods: {
      confirm() {
        this.onConfirm()
        this.close()
      },
      cancle() {
        this.onCancle()
        this.close()
      },
      close() {
        this.show= false
        if (this.$refs.modal) {
          this.$refs.modal.remove() // 关闭时候直接移除当前元素
        }
      }
    }
  }
  </script>

  <style lang="scss" scoped>
  .ek-modal_wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    font-size: 28px;
    background: rgba(0, 0, 0, 0.7);
    .ek-modal-content {
      position: fixed;
      top: 50%;
      left: 50%;
      min-width: 7.2rem;
      overflow-x: hidden;
      overflow-y: hidden;
      text-align: center;
      background-color: white;
      border-top-left-radius: 0.266667rem;
      border-top-right-radius: 0.266667rem;
      border-bottom-right-radius: 0.266667rem;
      border-bottom-left-radius: 0.266667rem;
      transform: translate(-50%, -50%);
      .modal-title-wrap {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        min-height: 55px;
        padding: 0 20px;
        color: #333;
      }
      .modal-title {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        min-height: 100px;
        margin-top: 30px;
        margin-bottom: 30px;
        font-weight: 600px;
        line-height: 50px;
        color: #333;
      }
      .modal-button {
        display: flex;
        line-height: 1;
        color: #333;
        border-top-color: #e7e7e7;
        border-top-style: solid;
        border-top-width: 1px;
        & > a {
          color: #333;
        }
        .contral-btn {
          flex-basis: 0%;
          flex-grow: 1;
          flex-shrink: 1;
          font-weight: 600px;
          line-height: 3;
          text-align: center;
          &.cancle-btn {
            border-left-color: #e7e7e7;
            border-left-style: solid;
            border-left-width: 1px;
          }
        }
      }
    }
  }
  </style> */}

//   2， 在Vue原型上绑定方法
import Vue from 'vue';
import dialog from './components/Dialog.vue';
function showDialog(options) {
    const Dialog = Vue.extend(dialog); // 返回一个vue子类
    //创建实例并且挂载
    const app = new Dialog().$mount(document.createElement('div'));
    //初始化参数
    for (let key in options) {
        app[key] = options[key];
    }
    //将元素插入body中
    document.body.appendChild(app.$el);
}
Vue.prototype.$showDialog = showDialog; //将方法放在原型上。

// 3，在你的Vue页面直接调用即可
// ....某vue页面  

mounted() {
    console.log(this.$showDialog);
    this.$showDialog({
        title: '测试弹窗',
        confirmText: '希望弹出窗口正确调用',
        cancelVisible: false,
    });
}

// Vue.component()方法实际上调用Vue.extend()创建子类构造方法，并且放入Vue.options.components, 实现全局注册
// 而Vue.extend仅仅是创建子类构造方法，不放入Vue.options.components。