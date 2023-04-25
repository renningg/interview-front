function validPalindrome(s: string): boolean {
  let isHuiFlag: boolean = true
  const aa = (str: string, i: number): string => {
    isHuiFlag = false
    let arr = str.split("")
    arr.splice(i, 1)
    return arr.join("")
  }

  for (let i = 0; i <= Math.floor(s.length / 2); i++) {
    if (s[i] != s[s.length - i - 1]) {
      if (!isHuiFlag) return false   
      return validPalindrome(aa(s, i)) || validPalindrome(aa(s, s.length - i - 1))
    }

  }
  return true
};

console.log(validPalindrome("abc"));



