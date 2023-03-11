// 暴力算法，两个for循环
var minSubArrayLen = function (target, nums) {
  let len = nums.length;
  let res = Infinity;
  let sum;
  let subString = 0;
  for (let i = 0; i < len; i++) {
    sum = 0;
    for (let j = i; j < len; j++) {
      sum += nums[j];
      if (sum >= target) {
        subString = j - i + 1;
        res = res > subString ? subString : res;
        break;
      }
    }
  }
  return res == Infinity ? 0 : res
};

console.log(minSubArrayLen(11, [1, 2, 3, 4, 5]));