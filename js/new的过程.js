// 1, 在内存中创建一个新对象
// 2, 新对象的prototype被赋值为构造函数的prototype
// 3, 构造函数内部this被赋值为这个新对象（改变this指向）
// 4, 执行构造器里面的代码 （给新对象添加属性）
// 5, 如果构造函数返回非空对象, 则返回该对象，否则返回新对象

// 实现new
function myNew() {
    //创建一个新对象
    var obj = new Object();
    //取出参数中的第一个参数，获得构造函数
    var constructor = Array.prototype.shift.call(arguments);
    //连接原型，新对象可以访问原型中的属性
    obj._proto_ = constructor.prototype;
    // 执行构造函数，即绑定 this，并且为这个新对象添加属性
    var result = constructor.apply(obj, arguments);
    return typeof result === "object" ? result : obj;
}

function myNew(fn) {
    // 创建一个新对象，且把构造函数的prototype赋值给新对象的prototype
    const obj = Object.create(fn.prototype);
    // 更改 this 指向，把构造函数的 this 赋值给 新对象，且给新对象添加属性
    result = fn.apply(obj, [...arguments].slice(1));
    // 判断构造函数如果返回非空对象，则返回该对象，否则返回新对象obj
    return typeof result === "object" ? result : obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log("I am "  + this.name)
    }
}

// let person1 = new Person("Star", 20);
// console.log(person1.name);
// console.log(person1.age);
// person1.say();

let person2 = myNew(Person, "Star", 20);
console.log(person2.name);
console.log(person2.age);
person2.say();



