const fn = () => {
  (function name(params) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        console.log("宏任务");
      }, 500);
      console.log("同步任务");
  
    }
  })()
}
fn();