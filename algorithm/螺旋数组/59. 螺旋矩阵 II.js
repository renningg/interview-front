var generateMatrix = function (n) {
  let startI = 0,
    startJ = 0;
  let count = 1;
  let offset = 1;
  let arr = new Array(n).fill(0).map(item => new Array(n).fill(0))
  let loop = mid = Math.floor(n / 2);
  while (loop--) {
    let i = j = startI;
    for (; j < startI + n - offset; j++) {
      arr[startI][j] = count;
      count++;
    }
    for (; i < startI +n - offset; i++) {
      arr[i][j] = count;
      count++;
    }
    for (; j > startJ; j--) {
      arr[i][j] = count;
      count++;
    }
    for (; i > startI; i--) {
      arr[i][j] = count;
      count++;
    }
    startI++;
    startJ++;
    offset+=2;
  }
  if (n % 2 != 0) {
    arr[mid][mid] = count
  }

  return arr;
};

console.log(generateMatrix(4));