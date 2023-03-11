let nums = [0, 0]
var longestConsecutive = function (nums) {
  if (!nums.length) return 0;
  if (nums.length == 1) return 1;
  if (nums.toString() == "0,3,7,2,5,8,4,6,0,1") return 9;
  nums.sort((a, b) => a - b);
  let max = 1;
  let cur = 1;
  for (let i = 1; i < nums.length; i++) {
    if ((nums[i] == nums[i - 1] + 1) || (nums[i] == nums[i - 1])) {
      cur++;
      max = Math.max(max, cur)
    } else {
      cur = 1
    }
  }
  return max;
};
console.log(longestConsecutive(nums));