
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

// JSON的parse和stringify方法也可以实现强拷贝
// 比较简单的深拷贝写法
function deepClone(item) {
    if (typeof item != "object" || item == null) return item
    let result = item.constructor()
    for (const key in item) {
        if (item.hasOwnProperty(key)) {
            result[key] = deepClone(item[key])
        }
    }
    return result
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

let aaaa = [1,2,3]
console.log(aaaa === deepCopy(aaaa));





