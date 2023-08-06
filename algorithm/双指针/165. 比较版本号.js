/**
 * 
示例 1：
输入：version1 = "1.01", version2 = "1.001"
输出：0
解释：忽略前导零，"01" 和 "001" 都表示相同的整数 "1"

示例 2：
输入：version1 = "1.0", version2 = "1.0.0"
输出：0
解释：version1 没有指定下标为 2 的修订号，即视为 "0"

示例 3：
输入：version1 = "0.1", version2 = "1.1"
输出：-1
解释：version1 中下标为 0 的修订号是 "0"，version2 中下标为 0 的修订号是 "1" 。
      0 < 1，所以 version1 < version2
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
let version1 = "1.11", version2 = "1.1";
var compareVersion = function (version1, version2) {
  const n = version1.length, m = version2.length;
  let i = 0, j = 0;
  while (i < n || j < m) {
    let x = 0;
    for (; i < n && version1[i] !== '.'; ++i) {
      x = x * 10 + version1[i].charCodeAt() - '0'.charCodeAt();
    }
    ++i; // 跳过点号
    let y = 0;
    for (; j < m && version2.charAt(j) !== '.'; ++j) {
      y = y * 10 + version2[j].charCodeAt() - '0'.charCodeAt();
    }
    ++j; // 跳过点号
    if (x !== y) {
      return x > y ? 1 : -1;
    }
  }
  return 0;
};
compareVersion(version1, version2)

function fn(version1, version2) {
  let arr1 = version1.split(".").map((item) => parseInt(item))
  let arr2 = version2.split(".").map((item) => parseInt(item))
  let max = Math.max(arr1.length, arr2.length)
  for (let i = 0; i < max; i++) {
    let num1 = arr1[i] || 0;
    let num2 = arr2[i] || 0;
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1
    } else if (i === max - 1) {
      return 0
    }
  }
}
console.log(fn(version1, version2));
