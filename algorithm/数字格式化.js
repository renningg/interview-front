let nums = 15602345
function formate(nums) {
  let result = []
  nums = nums.toString()
  let count = nums.length
  while (count >= 3) {
    result.unshift(nums.slice(count - 3, count))
    count = count - 3
  }
  count % 3 && result.unshift(nums.slice(0, count % 3))
  return result.toString()
}

function test(nums) {
  let result = ""
  let count = 0
  let str = nums.toString()
  for (let i = str.length - 1; i >= 0; i--) {
    count++
    result = str.charAt(i) + result
    if (!(count % 3) && i != 0) { result = "," + result }
  }
  return result
}


console.log(test(nums));