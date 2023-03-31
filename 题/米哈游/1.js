function fn(n, m) {
  let dp = new Array(n).fill(null)
  dp = dp.map(() => new Array(m).fill(null))
  console.log(dp);
  let val = 0;
  for (let j = 0; j < m; j++) {
    for (let i = 0; i < n; i++) {
      dp[i][j] = val++;
      if(val > 9 ) val = 0;
    }

  }
  return dp;
}
