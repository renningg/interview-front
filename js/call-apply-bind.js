
// https://blog.csdn.net/m0_46171043/article/details/123067986?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166873800916782414911458%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=166873800916782414911458&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-2-123067986-null-null.142^v65^control,201^v3^add_ask,213^v2^t3_esquery_v2&utm_term=js%E7%9A%84%E5%87%BD%E6%95%B0%20call%E5%92%8Capply%20bind%E6%89%8B%E5%86%99&spm=1018.2226.3001.4187

// 1.call和apply都是对函数的直接调用（也叫直接执行函数），而bind方法返回的仍然是一个函数，


// 2.call和apply都可以传参数。call后面的参数与fn方法中是一一对应的，
// 而apply的第二个参数是一个数组，数组中的元素是和fn方法中一一对应的，这就是两者最大的区别。

// 3.bind是ES5中的方法，可以像call一样传参，也可以在调用的时候再进行传参。

// 原理：就是利用 “点”定THIS机制，context.xxx=self “obj.xxx=func” => obj.xxx()
// apply和call实现类似，不同的就是参数的处理
// 实现的过程也和call基本一致。
// 只是在执行函数时，要判断一下，使用者有没有传入第二个参数，如果有的话，执行时传入...arguments[1]就可以。
// 如果没有传入，在执行时就不传入任何东西。
// call方法的第二个参数开始依次传入的。而apply是将多余的函数参数放在一个数组里，从第二个参数中统一传入。
Function.prototype.myCall = function (ctx) {
    ctx = ctx || window;
    let key = Symbol();
    ctx[key] = this;
    let args = [...arguments].splice(1);
    let result = ctx[key](...args);
    delete ctx[key];
    return result;
};
Function.prototype.myApply = function (ctx) {
    ctx = ctx || window;
    let key = Symbol();
    ctx[key] = this;
    let result;
    if (arguments[1]) {
        result = ctx[key](...arguments[1]);
    } else {
        result = ctx[key]();
    }
    delete ctx[key];
    return result;
};
//   在bind方法内部
//     和call/apply的区别：并没有把func立即执行
//     把传递进来的obj/10/20等信息存储起来「闭包」
//     执行bind返回一个新的函数 例如:proxy，把proxy绑定给元素的事件，当事件触发执行的是返回的proxy，在proxy内部，再去把func执行，把this和值都改变为之前存储的那些内容
Function.prototype.bind = function bind(context, ...params) {
    // this/self->func  context->obj  params->[10,20]
    let self = this;
    return function proxy(...args) {
        // 把func执行并且改变this即可  args->是执行proxy的时候可能传递的值
        self.apply(context, params.concat(args));
    };
};
// Function.prototype.myBind = function (ctx) {
//     ctx = ctx || window;
//     let self = this;
//     let args = [...arguments].splice(1);
//     let fn = function () { };
//     let _fn = function () {
//         return self.apply(this instanceof _fn ? this : ctx, args);
//     }
//     fn.prototype = this.prototype;
//     _fn.prototype = new fn();
//     return _fn;
// }

// func函数基于__proto__找到Function.prototype.call，把call方法执行
//   在call方法内部「call执行的时候」  call(context->obj,...params->[10,20])
//     + 把func中的this改为obj
//     + 并且把params接收的值当做实参传递给func函数
//     + 并且让func函数立即执行
// func.call(obj, 10, 20);
// func.apply(obj, [10, 20]);


