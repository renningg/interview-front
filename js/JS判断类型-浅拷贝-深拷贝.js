
// 判断类型
function checkType(item) {
    const obj = {
        "[object Object]": "Object",
        "[object Array]": "Array",
        "[object Number]": "Number",
        "[object String]": "String",
        "[object Date]": "Date",
        "[object Symbol]": "Symbol",
        "[object Undefined]": "Undefined",
        "[object RegExp]": "RegExp",
        "[object Null]": "Null",
        "[object Function]": "Function",
        "[object BigInt]": "BigInt",
    }
    return obj[Object.prototype.toString.call(item)]
}
// 浅拷贝
function shallowCopy(item) {
    let ctor = item.constructor
    if (checkType(item) == "BigInt" || checkType(item) == "Symbol") return new Object(item)
    if (checkType(item) == "Date" || checkType(item) == "RegExp") return new ctor(item)
    if (checkType(item) == "Function") return function () {
        return item.call(this, ...arguments)
    }
    if (checkType(item) == "Object") {
        let obj = {}
        for (let index in item) {
            obj[index] = item[index]
        }
        return obj
    }
    if (checkType(item) == "Array") {
        let arr = []
        for (let i = 0; i < item.length; i++) {
            arr[i] = item[i]
        }
        return arr
    }
    return item
}
// 深拷贝
function deepCopy(item, cache = new Set()) {
    if (checkType == "Object") {
        let ctor = item.constructor
        let result = new ctor()
        let keys = [...Object.keys(item), ...Object.getOwnPropertySymbols(item)]
        if (cache.has(item)) return item
        cache.add(item)
        for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = deepCopy(item[keys[i]], cache)
        }
    }
    if (checkType == "Array") {
        let ctor = item.constructor
        let result = new ctor()
        if (cache.has(item)) return item
        cache.add(item)
        for (let i = 0; i < item.length; i++) {
            result[i] = deepCopy(item[i], cache)
        }
        return result
    }
    return shallowCopy(item)
}





