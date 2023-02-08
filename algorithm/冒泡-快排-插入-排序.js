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
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
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
    var j = i - 1;//默认已排序的元素
    while (j >= 0 && arr[j] > temp) {  //在已排序好的队列中从后向前扫描
      arr[j + 1] = arr[j]; //已排序的元素大于新元素，将该元素移到一下个位置
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr
}
console.log(bubble([1, 5, 0, 2, 5, 6]));
console.log(quickSort([1, 5, 0, 2, 5, 6]));
console.log(insertSort([1, 5, 2, 0, 1, 5]));
