function timer(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(delay)
    }, delay);
  })
}

const start = Date.now();
Promise.all(
  [
    timer(20),
    timer(10),
    timer(30),
  ]
).then(val => {
  console.log(Date.now() - start < 60)
  console.log(val)
})