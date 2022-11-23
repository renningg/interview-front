// 题目：
// 输入5，输出[ [ 2, 3 ] ]
// 输入10，输出[ [ 1, 2, 3, 4 ] ]
// 输入15，输出[ [ 1, 2, 3, 4, 5 ], [ 4, 5, 6 ], [ 7, 8 ] ]

function fn(count) {
    let arr = [];
    let middle = Math.ceil(count)
    for (let i = 1; i < middle; i++) {
        // j控制累加的次数
        for (let j = 2; ; j++) {
            let sum = (i + (i + j - 1)) * (j / 2)
            if (sum > count) {
                break
            }
            else if (sum == count) {
                arr.push(createArr(i, j))
            }
        }
    }
    return arr
}

function createArr(i, len) {
    let arr = new Array(len)
    let count = i
    for (let index = 0; index < arr.length; index++) {
        arr[index] = count;
        count++
    }
    return arr
}

console.log(fn(5));