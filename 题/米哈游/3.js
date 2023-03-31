let arr = [3,"mhbdy","bd","mhbdy","mhmbhdyy","mhy","abc" ]
function fn(arr) {
  for (let i = 1; i < arr[0] * 2 + 1; i=i+2) {
    let str1 = [] ;
    let str2 = [];
    for (let index = 0; index < arr[i].length; index++) {
     str1.push(arr[i][index])
    }
    for (let index = 0; index < arr[i + 1].length; index++) {
      let ss = arr[i + 1]
      let s = arr[i + 1][index]
      str2.push(arr[i + 1][index])
     }
    
    let l1 = str1.length;
    let l2 = str2.length;
    if (l1 > l2) {
      for (let i = 0; i < l2; i++) {
        let val = str2[i];
        let index = str1.indexOf(val)
        str1.splice(index, 1)
      }
      // console.log(fn1(str1))
       fn1(str1)
    } else if (l1 <= l2) {
      for (let i = 0; i < l1; i++) {
        let val = str1[i];
        let index = str2.indexOf(val)
        str2.splice(index, 1)
      }
      // console.log(fn1(str2))
       fn1(str2)
    }
  }

}
const fn1 = (str) => {
  str = str.join("")
  console.log(str);
  for (let i = 0; i < str.length; i++) {
    if (str[i] != 'm' && str[i] != 'h' && str[i] != 'y') {
      return "NO"
    }

  }
  return "YES"
}
fn(arr)