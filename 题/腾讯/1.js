/**
 * YYYY-MM-DD
1642064229723 2022-01-13

D/M/YY
1642064363420 13/1/22

[Month:]M [Day:]D
1642065668340 Month:1 Day:13

YYYYYY
1642124398090 202222
 * 
 */

let time = new Date()

console.log(new Date(1642124398090));
console.log(2022 + "2022".slice(2));

function fn(string, stamp) {
  let year;
  let month;
  let day;
  if (string == "YYYY-MM-DD") {
    let info = new Date(stamp)
    year = info.getFullYear();
    month = info.getMonth() + 1 <= 9 ? '0' + (info.getMonth() + 1).toString() : info.getMonth() + 1;
    day = info.getDate();
    return info.getFullYear() + '-' + month + '-' + day
  }
}

console.log(fn("YYYY-MM-DD", 1642064229723));
console.log(typeof Number("11"));