var a = "全局参数"
function closePack() {
  var a = "局部参数";
  return {
    A: () => {
      console.log(a);
    }
  }
}
const fn = new closePack()
fn.A()
console.log(a);

