let str = "sdadadaddadddd"
function query(str) {
    let arr = str.split("")
    let setArr = [...new Set(arr)]
    let res = {}
    let count = 0;
    let max = 0
    // 还可以用Map
    for (let i = 0; i < setArr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (setArr[i] == arr[j]) {
                count++;
            }
            if (j == arr.length - 1) {
                res[setArr[i]] = count
                max = Math.max(max, count)
                count = 0;
            }
        }
    }
    Object.keys(res).forEach(item => {
        console.log("字符" + item + "出现的次数是", res[item])
        if(res[item] == max) console.log("出现次数最多的是" + item, "出现次数是" + max);
    })
}
// query(str)
// var str = "HELLO"
// test()
// function test() {
//     console.log(str);
//     var str = "hahaha"
//     console.log(str);

// }
// console.log(str);

let dog = {
    breed: "边境牧羊犬",
    sound: "Wooh",
    getBreed: () => {
        // this.breed
        console.log(this);
    },
    getSound: function () { return this.sound }
}

var obj = {
    name: 'obj',
    fun: ()=>console.log(this)
}

obj.fun(); //输出 {name: "obj", fun: ƒ}

// console.log(dog.getBreed(), dog.getSound());
// const obj = {

//     name: '张三',

//     age: 18,

//     sex: '男',

//     //    对象中定义的函数 this指向是这个对象本身

//     fun1: function () {

//         console.log( this)

//     },

//     //     箭头函数,this指向是父级程序

//     //     当前箭头函数,父级程序是对象

//     //     对象是没有this的,箭头函数this指向是window

//     fun2: () => {

//         console.log(typeof this )

//     },

//     fun3: function () {

//         //         定义在对象中的函数fun3,this指向是对象本身

//         //         函数fun4是一个箭头函数

//         //         存储在 函数fun3 中 父级程序就是函数fun3

//         //         函数fun3的this指向是存储fun3的对象obj

//         //         箭头函数fun4 的this指向 和 父级程序fun3的this指向相同

//         //         也就是 obj对象本身

//         const fun4 = () => {

//             console.log(this);

//         }

//         fun4();

//     }

// };

// console.log(obj.fun2());
