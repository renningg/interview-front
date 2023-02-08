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

function fn(nums){
  let res = []
  let str = nums + ''
  for(let i = str.length ; i > 0 ; i-=3){
    res.push(str[i - 1])
    res.push(str[i - 2])
    res.push(str[i - 3])
    res.push(',')
  }
  res.pop()
  
  return res.reverse().join('')
}


console.log(fn(nums));