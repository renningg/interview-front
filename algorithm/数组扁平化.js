
// 1，利用ES6数组的flat方法，传入Infinity，实现无限次数的扁平
function arrayFlat(arr) {
    return arr.flat(Infinity)
}

// 2，转为字符串，再分割
function tostringFlat(arr) {
    return arr.toString().split(",").map(item => parseFloat(item))
}

// 用JSON转字符串，再用正则去除[]
function regexpFlat(arr) {
    return JSON.stringify(arr).replace(/(\[|\])/g, "").split(",").map(item => parseFloat(item))
}

// 3，循环验证是否为数组
function whileFlat(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr
}

// 递归验证是否为数组
function circleFlat(arr) {
    let result = []
    const fn = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
            if (Array.isArray(item)) {
                fn(item)
                continue
            }
            result.push(item)
        }
    }
    fn(arr)
    return result
}

// console.log(arrayFlat([1, [2, 3], [4, [5]]]));
// console.log(tostringFlat([1, [2, 3], [4, [5]]]));
// console.log(regexpFlat([1, [2, 3], [4, [5]]]));
// console.log(whileFlat([1, [2, 3]]));
// console.log(circleFlat([1, [2, 3]]));
