function isValid(str) {
  let array = str.split("")
  let left = []
  for (let index = 0; index < array.length; index++) {
    if (array[index] == "{" || array[index] == "(" || array[index] == "[") {
      left.push(array[index])
    } else {
      if (array[index] == "}" && left.pop() != "{") {
        return false
      }
      if (array[index] == ")" && left.pop() != "(") {
        return false
      }
      if (array[index] == "]" && left.pop() != "[") {
        return false
      }
    }

  }
  return left.length == 0
}


