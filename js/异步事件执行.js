
    // 微任务队列，先进先出的原则，


    console.log('script start');

    setTimeout(function () {
      console.log('setTimeout');
    }, 0);

    async1();

    new Promise(function (resolve) {
      console.log('promise1');
      resolve();

    }).then(function () {
      console.log('promise2');
    }).then(function () {
      console.log('promise3');
    });

    console.log('script end');

    // script start
    // async1 start
    // async2 start
    // async2 promise
    // promise1
    // script end
    // async1 end
    // promise2
    // promise3
    // setTimeout
