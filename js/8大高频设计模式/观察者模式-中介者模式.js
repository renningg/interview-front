/**
 *  Observer [əbˈzɜːrvər]观察者模式：目标与观察员直接通信
 *  Mediator [ˈmiːdieɪtər]中介者模式：发布者通过中介注册方法，订阅者在某个时刻去执行方法
 * 
 */

// 观察者模式:vue2.0响应式原理...
class Observer {
    update(message) {
        // 消息触达，通知update执行
        console.log('消息接收！', message);
    }
}

class Observer{
    update(){

    }
}

class ObverList{
    constructor(){
        list = []
    }
    add(observer){
        this.list.push(observer)
        return this
    }
    remove(index){
        this.list.splice(index,1)
        return this
    }

}

class Subject{
    observers = new ObserverList;
    add(){

    }
    remove(){

    }
    notify(){

    }
}

//目标
class ObserverList {
    constructor() {
        this.observerList = [];
    }
    add(observer) {
        this.observerList.push(observer);
        return this;
    }
    remove(observer) {
        this.observerList = this.observerList.filter(ob => ob !== observer);
        return this;
    }
    get(index) {
        return this.observerList[index];
    }
    count() {
        return this.observerList.length;
    }
}
class Subject {
    observers = new ObserverList;
    add(observer) {
        this.observers.add(observer);
    }
    remove(observer) {
        this.observers.remove(observer);
    }
    notify(...params) {
        for (let i = 0; i < this.observers.count(); i++) {
            let item = this.observers.get(i);
            item.update(...params);
        }
    }
}



let sub = new Subject;
sub.add(new Observer);
sub.add(new Observer);
sub.add(new Demo);
setTimeout(() => {
    sub.notify('你好~~欢迎大家报名珠峰培训在线web高级！');
}, 1000);

// 中介者
let mediator = (function () {
    let topics = {};

    // 订阅：订阅A组件中的某个方法
    let subscribe = function subscribe(topic, callback) {
        !topics[topic] ? topics[topic] = [] : null;
        topics[topic].push({
            context: this,
            callback
        });
    };

    // 发布：B组件中到某个阶段，可以通知之前订阅的方法执行
    let publish = function publish(topic, ...params) {
        if (!topics[topic]) return;
        topics[topic].forEach(item => {
            let {
                callback,
                context
            } = item;
            callback.call(context, ...params);
        });
    };
    
    return {
        subscribe,
        publish
    };
})();


/* {
   'xxx':[{
       callback,
       context
   },{
       callback,
       context
   },{
       callback,
       context
   }]
} */