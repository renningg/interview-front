// let arr = [[2, , 6], ['R', 'R', 'G', 'G', 'B', 'B'], ['R', 'G', 'B', 'G', 'R', 'R']]
let arr = [['R', 'R', 'G', 'G', 'B', 'B'], ['R', 'G', 'B', 'G', 'R', 'R']]
// let arr = [[0, 0, 1, 1, 2, 2], [0, 1, 2, 1, 0, 0]]
// fn(arr)

// function fn(arr) {
//   let n = arr[0][0]
//   let m = arr[0][2]
//   let dp = new Array(n).fill(null)
//   dp = dp.map(() => new Array(m).fill(null))
//   for (let i = 1; i < n + 1; i++) {
//     for (let j = 0; j < m; j++) {
//       if (arr[i][j] == 'R') {
//         dp[i - 1][j] = 0
//       } else if (arr[i][j] == 'G') {
//         dp[i - 1][j] = 1
//       } else if (arr[i][j] == 'B') {
//         dp[i - 1][j] = 2
//       }
//       // dp[i - 1][j] = arr[i][j]
//     }
//   }
//   console.log(dp);
//   console.log(dfs(dp,n,m));
//   return dp;
// }

console.log(dfs(arr, 2, 6));
function dfs(grid, r, c) {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      res = computeR(grid, i, j) + computeG(grid, i, j)
    }
  }
  return res
}
function isArea(grid, r, c) {
  return (r >= 0 && r < grid[0].length) && (c >= 0 && c < grid.length)
}
function computeR(grid, i, j) {
  console.log(i,j);
  if (!isArea(grid, i, j)) return 0;
  if (grid[i][j] != 'R') return 0;
  return 1 + computeR(grid, i - 1, j)
    + computeR(grid, i + 1, j)
    + computeR(grid, i, j - 1)
    + computeR(grid, i, j + 1)
}
function computeG(grid, i, j) {
  if (!isArea(grid, i, j)) return 0;
  if (grid[i][j] == 'R') return 0;
  return 1 + computeG(grid, i - 1, j)
    + computeG(grid, i + 1, j)
    + computeG(grid, i, j - 1)
    + computeG(grid, i, j + 1)
}
