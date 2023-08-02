/****
背包最大重量为4。

物品为：
重量	价值
物品0	1	15
物品1	3	20
物品2	4	30

问背包能背的物品最大价值是多少？
****/

// 二维DP解法

/**  
 背包容量
 重量数组
 价值数组
***/

const handleP = (weight, value, size) => {
  let len = weight.length
  let dp =  Array(len).fill().map(item =>  Array(size + 1).fill(0))
  dp[0] = dp[0].map(item => item = value[0])
  for (let i = 1; i < value.length; i++) {
    for (let j = 0; j <= size; j++) {
      if (j < weight[i] ) {
        dp[i][j] = dp[i - 1][j]
      } else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weight[i]] + value[i])
    }
  }
  return dp[len - 1][size]
}
console.log(handleP([1, 3, 4, 5], [15, 20, 30, 55], 6));


function testWeightBagProblem (weight, value, size) {
  // 定义 dp 数组
  const len = weight.length,
        dp = Array(len).fill().map(() => Array(size + 1).fill(0));

  // 初始化
  for(let j = weight[0]; j <= size; j++) {
      dp[0][j] = value[0];
  }

  // weight 数组的长度len 就是物品个数
  for(let i = 1; i < len; i++) { // 遍历物品
      for(let j = 0; j <= size; j++) { // 遍历背包容量
          if(j < weight[i]) dp[i][j] = dp[i - 1][j];
          else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
  }

  console.table(dp)

  return dp[len - 1][size];
}

function test () {
  console.log(testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6));
}

test();