// 1. ../assets/题/奇安信.png

// 输入[[0,0,1,1],[4,4,2,2]]  输出9995

function getWhiteCounts(rects) {
  let arr = new Array(100).fill(0).map(() => new Array(100).fill(0))
  // 循环遍历二维数组每个数组的坐标，计算当前画 1 的坐标点
  for (const item of rects) {
    let xMin = Math.min(item[0], item[2])
    let xMax = Math.max(item[0], item[2])
    let yMin = Math.min(item[1], item[3])
    let yMax = Math.max(item[1], item[3])
    for (let i = xMin; i < xMax; i++) {
      for (let j = yMin; j < yMax; j++) {
        arr[i][j] = 1 - arr[i][j]
      }
    }
  }
  // 设 k 为 当前元素为 1 的累计和
  let k = 0;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (arr[i][j]) k++;
    }
  }
  return 100 * 100 - k;
}

console.log(getWhiteCounts([[0, 0, 1, 1], [4, 4, 2, 2]]));
console.log(getWhiteCounts([[0, 0, 1, 1], [4, 4, 0, 0], [0, 0, 1, 1]]));
