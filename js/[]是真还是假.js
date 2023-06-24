// 参考链接：https://segmentfault.com/q/1010000004287934

// 不能简单地认为空数组是真还是假，比如：
// [] == false // true
// ![]  // false

// 参考 http://es5.github.io/#x11.4.9 ，
// ! 算符是根据 ToBoolean 算法再取反，ToBoolean 算法将包含空数组在内的 Object 当作真值；
// 而采用 == 算符比较时则会用 ToNumber 算法，
// ToNumber 算法则将空数组转为 0，
// 也就是一个假值……而上面用 == 比较的情况等价于 ToPrimitive([]) == ToNumber(false)，
// 此时空数组看起来像假值。

