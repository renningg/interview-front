// 前后指针
let s = "A man, a plan, a canal: Panama"
var isPalindrome = function (s) {
  s = s.replace(/\W|_/g, '').toLowerCase()
  let slow = 0;
  let fast = s.length - 1
  while (s[slow] == s[fast]) {
    slow++;
    fast--;
    if (slow >= fast) return true
  }
  return false
};

console.log(isPalindrome(s));


var rex = /\W|_/g
console.log("sss111____333###@@@@".replace(rex,''));