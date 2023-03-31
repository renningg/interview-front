/**
 * 给你两个整数 a 和 b ，不使用 运算符 + 和 - ​​​​​​​，计算并返回两整数之和。
示例 1：

输入：a = 1, b = 2
输出：3
示例 2：

输入：a = 2, b = 3
输出：5
 * 
 */

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  if (a == 0) return b;
  if (b == 0) return a;
  let val1 = Math.pow(10, a);
  let val2 = Math.pow(10, b);
  return Math.log10(val1 * val2)

};