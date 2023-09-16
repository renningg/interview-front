function maxCompletedHomework(homeworks) {
  const n = homeworks.length;

  // 创建动态规划数组dp，用于保存每天能完成的最大作业数
  const dp = new Array(n + 1).fill(0);

  // 初始化第1天和第2天的作业数量
  dp[1] = homeworks[0];
  dp[2] = Math.max(homeworks[0], homeworks[1]);

  for (let i = 3; i <= n; i++) {
    // 当前状态下能完成的最大作业数取决于前一天和前两天能完成的最大作业数加上今天的作业数
    dp[i] = Math.max(dp[i - 1], dp[i - 2]) + homeworks[i - 1];
  }

  // 返回假期最后一天能完成的最大作业数
  return dp[n];
}

// 测试示例
// const homeworks = [2, 1, 2, 1, 2];  // 每天能完成的作业数
// const maxHomeworks = maxCompletedHomework(homeworks);
// console.log(maxHomeworks);  // 输出：6
function getWeightSum(rootIdx, weights) {
  const n = weights.length;

  if (rootIdx > n) {
    return 0;
  }

  const leftIdx = rootIdx * 2;
  const rightIdx = rootIdx * 2 + 1;
  const leftSum = getWeightSum(leftIdx, weights);
  const rightSum = getWeightSum(rightIdx, weights);

  return weights[rootIdx - 1] + leftSum + rightSum;
}

function compareWeightSum(n, weights, queryIdx) {
  const sum = getWeightSum(queryIdx, weights);

  const leftSum = getWeightSum(queryIdx * 2, weights);
  const rightSum = getWeightSum(queryIdx * 2 + 1, weights);

  if (leftSum > rightSum) {
    return "L";
  } else if (rightSum > leftSum) {
    return "R";
  } else {
    return "E";
  }
}

// 测试示例
const n = 7;  // 结点个数
const weights = [1, 2, 3, 3, 2, 5, 1];  // 结点权重值
const queryIdx = 3;  // 待查询结点编号

const result = compareWeightSum(n, weights, queryIdx);
console.log(result);  // 输出：L
