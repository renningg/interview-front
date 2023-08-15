function fn(a) {
  var b = a * a
  return b;
}
for (b = 0; b < 6; b++) {
  console.log(fn(b));
}

console.log([1,2,3,4,5,6].splice(1,1,[2,5,6,4],5));