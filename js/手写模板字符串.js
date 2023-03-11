
let str1 = 'abc', str2 = 'def'
let esStr = '第一个字符串是${ str1},第二个字符串是${str2}'
function strParse(string) {
  // \$ 转义字符，匹配 $ 符号;\{ 转义字符，匹配 { 符号; 
  // .+?表示最小匹配; \} 转义字符，匹配 } 符号;
  let reg = /\$\{(.+?)\}/g
  return string.replace(reg, function () {
    // eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
    return eval(arguments[1])
  })
}

console.log(strParse(esStr)) // 第一个字符串是abc,第二个字符串是def

