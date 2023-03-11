function myInstanceOf(item, fun) {
  if (typeof item !== "object" && typeof item !== "function" && item == null) return false
  let prototype = fun.prototype
  let proto = item.__proto__
  while (prototype !== proto) {
    proto = proto.__proto__
    if (proto == null) return false
  }
  return true
}


