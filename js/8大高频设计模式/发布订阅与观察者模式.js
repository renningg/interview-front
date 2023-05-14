/***
 *  观察者模式与发布订阅非常相似，区别：
 *    发布订阅者模式会有一个调度中心去互相联系
 *    观察者模式只有观察者和被观察者直接联系
 */


// 发布订阅模式：一方发布，多方订阅
class eventBus {
  // 调度中心
  busObjList = {}
  // 发布：(事件名称，参数)
  $emit = function (event, params) {
    this.busObjList[event].forEach(event => event(params))
  }
  // 订阅：(事件名称，回调)
  $on = function (event, cb) {
    !this.busObjList[event] ? this.busObjList[event] = [cb] : this.busObjList[event].push(cb)
  }
}


// 使用
const events = new eventBus()
// 定义
events.$on("update", (params) => {
  console.log(params);
})
events.$on("update", (params) => {
  console.log(params);
})

events.$emit("update", "params")

// 观察者模式
class Obverser {
  update(params) {
    console.log(params);
  }
}

class observerList {
  observerList = []
  add(observer) {
    this.observerList.push(observer)
    return this
  }
  remove(obverser) {
    this.observerList = this.observerList.filter(item => item != obverser)
    return this
  }
  size() {
    return this.observerList.length
  }
  getValue(index) {
    return this.observerList[index]
  }
}

class Subject {
  list = new observerList()
  add(obverser) {
    list.add(obverser)
  }
  remove(obverser) {
    list.remove(obverser)
  }
  notify(params) {
    for (let i = 0; i < list.size; i++) {
      const item = getValue[i];
      item.update(params)

    }
  }
}
