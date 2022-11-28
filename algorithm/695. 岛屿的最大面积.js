function dfs(grid) {
  const r = grid.length
  const c = grid[0].length
  let res = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (grid[i][j] == 1) {
        let a = flag(grid, i, j)
        res = Math.max(res, a)
      }
    }
  }
  return res
}

function flag(grid, i, j) {
  if (!isArea(grid, i, j)) return 0;
  if (grid[i][j] != 1) return 0;
  grid[i][j] = 2
  return 1
    + flag(grid, i, j - 1)
    + flag(grid, i, j + 1)
    + flag(grid, i - 1, j)
    + flag(grid, i + 1, j)
}

function isArea(grid, r, c) {
  return (r >= 0 && r < grid.length) && (c >= 0 && c < grid[0].length)
}
