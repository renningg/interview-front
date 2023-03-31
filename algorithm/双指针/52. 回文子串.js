/**
 * 
 * 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
  回文字符串 是正着读和倒过来读一样的字符串。
  子字符串 是字符串中的由连续字符组成的一个序列。
  具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

    示例 1：

    输入：s = "abc"
    输出：3
    解释：三个回文子串: "a", "b", "c"
    示例 2：

    输入：s = "aaa"
    输出：6
    解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 * @param {string} s
 * @return {number}
 * 
 * 思路：两个指针，依次向外扩展
 */
var countSubstrings = function (s) {
  let res = 0;
  const fn = (i, j, s, len) => {
    let result = 0;
    while (i >= 0 && j < len && s[i] == s[j]) {
      result++;
      i--;
      j++;
    }
    return result;
  }
  for (let i = 0; i < s.length; i++) {
    res += fn(i, i, s, s.length)
    res += fn(i, i + 1, s, s.length)
  }

  return res;
};