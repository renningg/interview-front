function maxSameSubstring(str) {
  if (!str) return str
  let arr = []
  let newStr = ''
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      let s = str.substring(i, j)
      if (arr.indexOf(s) > -1 && newStr.length < s.length) {
        newStr = s
      }
      arr.push(s)
    }
  }
  return newStr
}
console.log(maxSameSubstring("fafafffffaaaaaa"));
