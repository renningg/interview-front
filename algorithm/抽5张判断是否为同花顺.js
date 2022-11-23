
// 题目：
// 从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。
// 2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。


// 方法一：
// 把数组排序，统计数组中0的个数，
// 统计排序之后的数组相邻数字之间的空缺总数。
// 如果空缺的总数小于或者等于0的个数，那么这个数组就是连续的；反之则不连续。
var isStraight = function (nums) {
  let count = 0;
  let temp = 0;
  let arr = []
  for (let val of nums) {
    if (val != 0) {
      arr.push(val)
    }
  }
  if ([...new Set(arr)].length != arr.length) return false
  for (let val of nums) {
    if (val == 0) count++
  }
  arr = arr.sort((a, b) => a - b)
  for (let i = 1; i < arr.length; i++) {
    console.log(temp);
    temp += arr[i] - arr[i - 1] - 1
  }
  console.log(temp, count);
  if (temp <= count) {
    return true
  } else return false

};
// 方法二：
function fun(nums) {
  let arr = nums.filter(item => item != 0)
  if (new Set(arr).size != arr.length) return false;
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  return max - min <= 4;
}



