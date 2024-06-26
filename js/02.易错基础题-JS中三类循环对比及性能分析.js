/*
 * 易错基础题：JS中三类循环对比及性能分析?
 *   + for循环及forEach底层原理
 *      FOR循环是自己控制循环过程
 *      Q1:基于var声明的时候，FOR和WHILE性能差不多「不确定循环次数的情况下使用WHILE」  
 *      Q2:基于let声明的时候，FOR循环性能更好「原理：没有创造全局不释放的变量」   
 *      Q3:重写FOR-EACH
 *   + for in循环的BUG及解决方案
 *      Q1:迭代所有可枚举属性「私有&公有」，按照原型链一级级查找很耗性能
 *      Q2:问题很多：不能迭代Symbol属性、迭代顺序会以数字属性优先、公有可枚举的{一般是自定义属性}属性也会进行迭代
 *   + for of循环的底层机制
 *      Q1:迭代器iterator规范「具备next方法，每次执行返回一个对象，具备 value/done 属性」
 *      Q2:让对象具备可迭代性并且使用for of循环***/

// forEach没有返回值；map 和 fliter 都有返回值
// 重写 forEach
function forEach(cb) {
    let self = this;
    for (let i = 0; i < self.length; i++) {
        cb(self[i], i, self)
    }
}
// 重写 map
function myMap(cb) {
    let newArr = []
    for (let i = 0; i < this.length; i++) {
        newArr.push(cb(this[i], i, this))
    }
    return newArr
}

// 重写 fliter
function myFliter(cb) {
    let newArr = []
    for (let i = 0; i < this.length; i++) {
        // 回调函数返回 true 才会被添加到新数组
        (cb(this[i], i, this)) && newArr.push(this[i])
    }
    return newArr;
}

// 给对象添加接口机制
const obj = {
    max: 5,
    current: 0,
    [Symbol.iterator]() {
        return {
            max: this.max,
            current: this.current,
            next() {
                if (this.current == this.max) {
                    return {
                        value: undefined,
                        done: true
                    }
                } else {
                    return {
                        value: this.current++,
                        done: false
                    }
                }
            }
        }
    }
}
console.log([...obj])

for (let val of obj) {
    console.log(val);

}
/* 
*    + for of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象（iterator）的集合，但是不能遍历对象，
*          因为没有迭代器对象，但如果想遍历对象的属性，你可以用for in循环（这也是它的本职工作）
*          或用内建的Object.keys()方法
*      const obj = { name: '11', test: '22' }
       const test = function name(params) {
       Object.keys(obj).map(key => {
       console.log(key, obj[key]);
       });
       }
       test(); 
* 
*      + 迭代器就是一种接口机制，为各种不同的数据结构提供统一访问的机制。(即为了让一些不支持遍历的数据结构可遍历)
*/

/*
 *  获取对象所有私有属性【私有的，不论是否可枚举，不论类型】
 *      获取对象非Symbol类型的私有属性：
 *          Object.getOwnPropertyNames(arr)
 *      获取Symbol类型的私有属性
 *          Object.getOwnPropertySymbols(arr)
 * 
 *  可以基于ES6中的Reflect.ownKeys()代替上述操作(缺点：不兼容IE)
 *  let keys = Reflect.ownKeys(arr)
 */
let arr = new Array(9999999).fill(0);

// console.time('FOR~~');
// for (let i = 0; i < arr.length; i++) {}
// console.timeEnd('FOR~~');

// console.time('WHILE~~');
// let i = 0;
// while (i < arr.length) {
//     i++;
// }
// console.timeEnd('WHILE~~');

/*
 Array.prototype.forEach = function forEach(callback, context) {
    // this -> arr
    let self = this,
        i = 0,
        len = self.length;
    context = context == null ? window : context;
    for (; i < len; i++) {
        typeof callback === "function" ? callback.call(context, self[i], i) : null;
    }
};
*/
// console.time('FOREACH~~');
// arr.forEach(function (item) {});
// console.timeEnd('FOREACH~~');

// for in性能很差:迭代当前对象中所有可枚举的属性的「私有属性大部分是可枚举的，公有属性{出现在所属类的原型上的}也有部分是可枚举的」 查找机制上一定会搞到原型链上去
// console.time('FOR IN~~');
// for (let key in arr) {}
// console.timeEnd('FOR IN~~');

// 问题一：遍历顺序以数字有先
// 问题二：无法遍历Symbol属性
// 问题三：可以遍历到公有中可枚举的
/*
Object.prototype.fn = function fn() {};
let obj = {
    name: 'zhufeng',
    age: 12,
    [Symbol('AA')]: 100,
    0: 200,
    1: 300
};
// for (let key in obj) {
//     if (!obj.hasOwnProperty(key)) break;
//     console.log(key);
// }
let keys = Object.keys(obj);
if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
keys.forEach(key => {
    console.log('属性名：', key);
    console.log('属性值：', obj[key]);
});
*/

// iterator 迭代器
// 部分数据结构实现了迭代器规范
//    + Symbol.iterator
//    + 数组/部分类数组/Set/Map...「对象没有实现」
// for of循环的原理是按照迭代器规范遍历的

/* arr = [10, 20, 30];
arr[Symbol.iterator] = function () {
    let self = this,
        index = 0;
    return {
        // 必须具备next方法，执行一次next方法，拿到结构中的某一项的值
        // done:false value:每一次获取的值
        next() {
            if (index > self.length - 1) {
                return {
                    done: true,
                    value: undefined
                };
            }
            return {
                done: false,
                value: self[index++]
            };
        }
    };
}; */

// 1.let itor=arr[Symbol.iterator]();
// 2.itor.next()
//   ...
// console.time('FOR OF~~');
// for (const val of arr) {
//     console.log(val);
// }
// console.timeEnd('FOR OF~~');

/* // 类数组对象「默认不具备迭代器规范」
let obj = {
    0: 200,
    1: 300,
    2: 400,
    length: 3
};
obj[Symbol.iterator] = Array.prototype[Symbol.iterator];
for (let val of obj) {
    console.log(val);
} */