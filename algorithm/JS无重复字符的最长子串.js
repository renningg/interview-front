
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let arr = [];
  let m = 0
  for (let i = 0; i < s.length; i++) {
    let index = arr.indexOf(s[i])
    if (index !== -1) arr.splice(0, index + 1)
    arr.push(s[i])
    m = Math.max(arr.length, m)
  }
  return m
};
console.log(lengthOfLongestSubstring("daafafeefaffrew"));

