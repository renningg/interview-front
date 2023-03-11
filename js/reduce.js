Array.prototype.myReduce = function (cb, initialValue) {
    // previousValue, currentValue, currentIndex, array
    const array = this  //获取数组
    let acc = initialValue || array[0]  //acc相当于pre
    const startIndex = initialValue ? 0 : 1
    for (let i = startIndex; i < array.length; i++) {
        const cur = array[i]
        acc = cb(acc, cur, i, array)
    }
    return acc
}




