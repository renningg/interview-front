let url = "http://www.domain.com/?user=jack&id=123&id=456&id=789&city=%E5%8C%97%E4%BA%AC&enabled";

// 实现一个函数： parseParam
// 输入解析后的结果为:

// {
//   user: 'jack',
//   id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
//   city: '北京', // 中文需解码
//   enabled: true, // 未指定值得 key 约定为 false
// }
function fn(url) {
  let res = {}
  const handleItem = (item) => {

    if (item.includes("=")) {
      let arr = item.split("=")
      let key = arr[0];
      let value = toInt(arr[1]);
      if (res.hasOwnProperty(key)) {
        let temp = res[key]
        if (Object.prototype.toString.call(temp) === "[object Array]") {
          res[key] = [value, ...temp]
        } else {
          res[key] = [value, temp]
        }

      } else res[key] = value
    } else {
      res[item] = false
    }
  }
  const toInt = (item) => {
    return parseInt(item).toString() === item ? parseInt(item) : item
  }
  let str = url.split("?")[1]
  let arr = str.split("&")
  arr.forEach(item => {
    handleItem(item)
  })
  return res
}




console.log(fn(url));

// function parseParam(url) {
//   const paramsArr = url.slice(url.indexOf("?") + 1).split("&");
//   const map = new Map();
//   return reverseToRes(paramsArr, map);
// }
// function reverseToRes(strArr, map) {
//   const res = {};
//   strArr.forEach((item) => {
//     const [key, value] = item.split("=");
//     // 判断key是否单次出现
//     if (map.get(key) !== undefined) {
//       res[key] = [map.get(key), reverse(value)];
//     } else {
//       res[key] = reverse(value);
//     }
//     map.set(key, value);
//   });
//   return res;
// }
// function reverse(value) {
//   return (`${parseInt(value)}` === value ? parseInt(value) : value) ?? false;
// }
// console.log(parseParam(url));

