// 快速排序：
// O(nlogn)

// 插入排序：
// 时间复杂度：最坏情况下为O(N*N)，此时待排序列为逆序，或者说接近逆序
//       最好情况下为O(N)，此时待排序列为升序，或者说接近升序。

// 空间复杂度：O(1)

// 冒泡排序
function bubble(arr) {
  let temp;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] >= arr[j]) {
        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

// 快排
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  var mid = Math.floor(arr.length / 2);
  // 通过[0]拿到中间那数值
  var pivot = arr.splice(mid, 1)[0];
  var left = [], right = [];
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i];
    if (temp < pivot) {
      left.push(temp);
    } else {
      right.push(temp);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}



// 插入排序
function insertSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var temp = arr[i];
    //默认已排序的元素
    var j = i - 1;
    //在已排序好的队列中从后向前扫描
    while (j >= 0 && arr[j] > temp) {
      //已排序的元素大于新元素，将该元素移到一下个位置
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr
}


// 归并排序 时间复杂度O(nlogn)，空间复杂度 O(n)
function mergeSort(list) {
  const rec = arr => {
    if (arr.length === 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    const arr1 = rec(left)
    const arr2 = rec(right)
    let i = 0, j = 0
    let res = []
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        res.push(arr1[i++])
      } else {
        res.push(arr2[j++])
      }
    }
    if (i < arr1.length) res = res.concat(arr1.slice(i))
    if (j < arr2.length) res = res.concat(arr2.slice(j))
    return res
  }
  return rec(list)
}

console.log(bubble([1, 5, 0, 2, 5, 6]));
console.log(quickSort([1, 5, 0, 2, 5, 6]));
console.log(insertSort([1, 5, 2, 0, 1, 5]));
