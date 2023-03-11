let obj1 = { name: "小明" }
let obj2 = { age: 18, name: "小芳" }

// 展开运算符 注意：对象与对象之间，同名属性，会被后面对象的属性值所覆盖
//          数组之间 只会合并，就算是相同的值，也不会覆盖。（这是不同于对象的地方。）
let obj3 = {
  ...obj1,
  ...obj2
}
console.log(obj3);
// Object.assign() 注意：对象与对象之间，同名属性，会被后面对象的属性值所覆盖

let obj4 = Object.assign(obj1, obj2)
console.log(obj4);

// 固定一个对象，遍历另一个对象，赋值即可。
let obj = obj1;
for (let p in obj2) {
  if (obj2.hasOwnProperty(p))
    obj[p] = obj2[p];
}
console.log(obj);

/*
  扩展
 */
// Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
// 如果对象的属性值为简单类型（如string， number），通过Object.assign({},srcObj);得到的新对象为深拷贝；
// 如果属性值为对象或其它引用类型，那对于这个对象而言其实是浅拷贝的。

let testObj = { name: "小明" }
let testDeepCloneObj = Object.assign({}, testObj)
console.log(testObj === testDeepCloneObj);

let source = { a: { b : 1 }, c: 1 };
let target = Object.assign({}, source);
console.log(target)  // { a: { b: 1 }, c: 1 }
 
source.a.b = 2;
source.c = 3
console.log(source)  // { a: { b: 2 }, c: 3 }
console.log(target)  // { a: { b: 2 }, c: 1 }
// target.a.b的值随着source变化而变化，但是target.c的值并没有随着source变化
