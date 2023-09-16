// 力扣不要声明全局变量！！！！不信就去看77. 组合

/* 快速排序 */
function quickSort(arr) {
  let len = arr.length;
  if (len == 1) return len;
  let mid = Math.floor(len / 2);
  let midValue = arr.splice(mid, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < len; i++) {
    let temp = arr[i];
    if (temp < midValue) {
      left.push(temp)
    } else {
      right.push(temp)
    }
  }
  return quickSort(left).concat([midValue], quickSort(right))
}

/**二分查找 */
function fn(arr, target) {
  let len = arr.length
  let left = right = mid = Math.floor(len / 2)
  while (left < 0 || right >= len) {
    if (arr[left] > target) {
      left--;
    } else if (arr[right] < target) {
      right++
    }
  }
  return 0;
}

// 
// let str = "12344566887"
function lastCount(str) {
  let res = []
  let sum = 1;
  let j = 0;
  for (let i = 1; i < str.length; i++) {
    if (str[i] == str[j]) {
      sum++
    } else {
      res.push(sum)
      sum = 1;
      j = i;
    }
    if (i == str.length - 1) res.push(sum)
  }
  console.log(res);
}

function swap(nums, i, j) {
  let t = nums[j];
  nums[j] = nums[i];
  nums[i] = t;
}
function sortColors(nums) {
  let ptr = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      swap(nums, i, ptr);
      ++ptr;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      swap(nums, i, ptr);
      ++ptr;
    }
  }
  return nums;
}

// let str = "mihoyoyomihoyomimihoyo";
let k = 0;
function shortestSubstring(str, k) {
  const target = "mihoyo";
  let i = 0;
  let index = 0;
  let count = 0;
  let res = []
  for (let j = 0; j < str.length; j++) {
    let a = str[j]
    let b = target[index]
    if (a == b) {
      index++;
      if (index == target.length) {
        index = 0;
        count++;
        if (count == k) {
          count = 0;
          res.push(i, j)
          i++;
        }
      }
    } else {
      index = 0;
    }

  }
  return res;
}

const isValid = (str, k) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == 'm' && str[i + 5] == 'o') {
      count++
      if (count == k) {
        return true
      }
    }

  }
}
// console.log(shortestSubstring("mihoyoyomihoyomimihoyo", 2));  // 0 13 或者 8 22

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const r = grid.length;
  const c = grid[0].length;
  let res = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (grid[i][j] == 1) {
        res = flag(grid, i, j) + flag1(grid, i, j);
      }
    }
  }
  return res
};

function flag(grid, i, j) {
  if (!isArea(grid, i, j)) return 0;
  if (grid[i][j] != 0) return 0;
  grid[i][j] = 2;
  return 1 + flag(grid, i + 1, j)
    + flag(grid, i - 1, j)
    + flag(grid, i, j + 1)
    + flag(grid, i, j - 1)
}
function flag1(grid, i, j) {
  if (!isArea(grid, i, j)) return 0;
  if (grid[i][j] != 1) return 0;
  grid[i][j] = 2;
  return 1 + flag1(grid, i + 1, j)
    + flag1(grid, i - 1, j)
    + flag1(grid, i, j + 1)
    + flag1(grid, i, j - 1)
}
function isArea(grid, i, j) {
  return (i >= 0 && i < grid.length) && (j >= 0 && j < grid[0].length)
}

var multiply = function (num1, num2) {
  var a = Array.from(num1);
  var b = Array.from(num2);
  var n = (a.length + b.length) - 1;
  var arr = new Array(n).fill(0);
  var sum = new Array(n)
  if (num1 === '0' || num2 === '0') return '0'
  for (var j = a.length - 1; j >= 0; j--, n--) {
    for (var i = b.length - 1, hh = 1; i >= 0; i--, hh++) {
      var d = a[j] * b[i] + arr[n - hh]
      arr.splice(n - hh, 1, d)
    }
  }
  var num = 0
  for (var i = arr.length - 1; i >= 0; i--) {

    var chushu = Math.floor((arr[i] + num) / 10);
    var yushu = (arr[i] + num) % 10;
    num = chushu; sum.unshift(yushu);

  } if (num != 0) { sum.unshift(num) }

  return sum.join("")

};

var multiply = function (num1, num2) {
  let res = new Array(num1.length + num2.length).fill(0)
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      let p1 = i + j;
      let p2 = i + j + 1;
      let nums = num1[i] * num2[j];
      let sum = nums + res[p2]
      res[p1] += Math.floor(sum / 10);
      res[p2] = sum % 10;
    }
  }
  return res.join("")
};

// console.log(multiply("2","3"));
var firstUniqChar = function (s) {
  let myMap = new Map();
  let count = 1;
  for (let i = 0; i < s.length; i++) {
    if (myMap.has(s[i])) {
      count++;
      myMap.set(s[i], count)
    } else {
      count = 1;
      myMap.set(s[i], count)
    }
  }
  let arr = []
  myMap.forEach((value, key) => {
    // console.log(value,key);
    if (value == 1) {
      arr.push(s.indexOf(key))
    }
  })
  if (arr.length == 0) res.push(-1)
  return arr[0];
};


var firstUniqChare = function (s) {
  // 创建一个哈希表对象
  let map = new Map()
  // 统计次数
  for (let i = 0; i < s.length; i++) {
    let word = s.charAt(i)
    let val = map.get(word)
    if (map.has(word)) {
      map.set(word, val + 1)
    } else {
      map.set(word, 1)
    }
  }
  console.log(map);
  // 找到第一个只出现一次的字母
  for (let i = 0; i < s.length; i++) {
    if (map.get(s.charAt(i)) === 1) {
      return i
    }
  }
  return -1
};
var romanToInt = function (s) {
  let res = 0;
  let obj = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  }
  if (s.length == 1) return obj[s]
  for (let i = 0; i < s.length; i++) {
    let temp1 = s[i];
    let temp2 = s[i + 1];
    res += obj[temp1] < obj[temp2] ? -obj[temp1] : obj[temp1]
  }
  return res
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 *  let s = "anagram", t = "nagaram";
 */
// var isAnagram = function (s, t) {
//   let map1 = new Map()
//   let map2 = new Map()
//   for (let i = 0; i < s.length; i++) {
//     if (map1.has(s[i])) {
//       let val = map1.get(s[i])
//       map1.set(s[i], val + 1)
//     } else {
//       map1.set(s[i], 1)
//     }
//   }
//   for (let j = 0; j < t.length; j++) {
//     if (map2.has(t[j])) {
//       let val = map2.get(t[j])
//       map2.set(t[j], val + 1)
//     } else {
//       map2.set(t[j], 1)
//     }
//   }
//   for (let i = 0; i < s.length; i++) {
//     let val1 = map1.get(s[i])
//     let val2 = map2.get(s[i])
//     if (val1 != val2) return false
//   }
//   return true
// };

var isAnagram = function (s, t) {
  if (s.length != t.length) return false;
  let arr = new Array(26).fill(0)
  for (let i = 0; i < s.length; i++) {
    arr[s[i].charCodeAt() - 'a'.charCodeAt()]++
    arr[t[i].charCodeAt() - 'a'.charCodeAt()]--
  }
  for (let val of arr) {
    if (val != 0) return false
  }
  return true
};
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  // if (ransomNote == magazine) return true
  // if (ransomNote.length == magazine.length && ransomNote != magazine) return false
  // if (ransomNote.length > magazine.length) return false
  let map1 = new Map()
  let map2 = new Map()
  for (let i = 0; i < ransomNote.length; i++) {
    if (map1.has(ransomNote[i])) {
      let val = map1.get(ransomNote[i])
      map1.set(ransomNote[i], val + 1)
    } else {
      map1.set(ransomNote[i], 1)
    }
  }
  for (let j = 0; j < magazine.length; j++) {
    if (map2.has(magazine[j])) {
      let val = map2.get(magazine[j])
      map2.set(magazine[j], val + 1)
    } else {
      map2.set(magazine[j], 1)
    }
  }
  for (let i = 0; i < ransomNote.length; i++) {
    if (!map2.has(ransomNote[i])) return false
    let val1 = map1.get(ransomNote[i])
    let val2 = map2.get(ransomNote[i])
    if (val1 > val2) return false
  }
  return true
};
// console.log(canConstruct('abb','bba'));
var isHappy = function (n) {
  let map = new Map()
  function fn(n) {
    if (n == 1) return true;
    let sum = 0;
    let str = n.toString();
    for (let i = 0; i < str.length; i++) {
      sum += Math.pow(str[i] - 0, 2)
    }
    if (map.has(sum)) {
      return false
    } else {
      map.set(sum)
      return fn(sum)
    }

  }
  return fn(n);
};
let nums1 = [1, 2], nums2 = [-2, -1], nums3 = [-1, 2], nums4 = [0, 2];
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let count = 0;
  let map = new Map()
  for (let [index1, val1] of nums1.entries()) {
    for (let [index2, val2] of nums2.entries()) {
      map.set([index1, index2], val1 + val2)
    }
  }
  console.log(map.get(0 - 1));
  for (let [index1, val1] of nums3.entries()) {
    for (let [index2, val2] of nums4.entries()) {
      let val = val1 + val2;
      if (map.get(0 - val) != "undefined") {
        count++
      }
    }
  }
  return count
};

var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left <= right) {
    let temp = s[right];
    s[right] = s[left];
    s[left] = temp
    left++;
    right--
  }
  return s;
};
var repeatedSubstringPattern = function (s) {
  let str = ""
  for (let i = 0; i < s.length / 2; i++) {
    str += s[i];
    if (str.repeat(s.length / str.length) == s) return true
  }
  return false
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */

let phone = '13812345678';
let newPhone = phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
// console.log(newPhone); // 输出结果：138****5678


// 2. 找出一个数组中的重复项，并以新数组形式返回
var uniquePathsWithObstacles = function (obstacleGrid) {
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  let dp = new Array(m).fill().map(item => new Array(n).fill(0))
  for (let i = 0; i < m; ++i) {
    if (obstacleGrid[i][0] == 0) {
      dp[i][0] = 1;
    } else break;
  }
  for (let j = 0; j < n; ++j) {
    if (obstacleGrid[0][j] == 0) {
      dp[0][j] = 1;
    } else break;
  }

  for (let i = 1; i < m; ++i) {
    for (let j = 1; j < n; ++j) {
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]
    }
  }
  console.log(dp);
  return dp[m - 1][n - 1];
};

var maxProfit = function (prices) {
  let arr = []
  for (let i = 0; i < prices.length; i++) {
    j = i + 1;
    arr.push(prices[j] - prices[i])
  }
  arr = arr.filter(item => item > 0)
  console.log(arr);
  return arr.reduce((pre, cur) => pre + cur, 0)
};

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));

var canJump = function (nums) {
  nums.forEach((item, index) => {
    console.log(index + item - (nums.length - 1 - index));
    if (index + item >= nums.length - 1 - index) return true;
  })
  return false;
};
// 503. 下一个更大元素 II

// function nextGreaterElements(nums: number[]): number[] {
//   let newArr:number[] = [...nums,...nums];
//    let res:number[] = Array(newArr.length).fill(-1);
//   let stack:number[] = [];
//   for(let i = 0; i < newArr.length; i++){
//       while(stack.length && newArr[i] > newArr[stack[stack.length - 1]]){
//           let index = stack.pop()
//           res[index] = newArr[i]
//       }
//       stack.push(i)
//   }
//      return res.slice(0,nums.length);
//  };
// console.log(nextGreaterElements([1,2,1]));

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let left = [];
  let right = [];
  left.push(0);
  let res = 0;
  for (let i = 1; i < height.length; i++) {
    let arr = height.slice(0, i)
    let val = Math.max(...arr)
    left.push(val)
  }
  for (let i = 1; i < height.length; i++) {
    let arr = height.slice(i, height.length)
    let val = Math.max(...arr)
    right.push(val)
  }
  right.push(0)
  for (let i = 0; i < height.length; i++) {
    let val = Math.min(left[i], right[i]) - height[i]
    if (val > 0) {
      res = res + val
    }
  }
  return res;
};
// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
var eraseOverlapIntervals = function (intervals) {
  let res = 0;
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      intervals.splice(i, 1);
      i--;
      res++;
    }
  }
  return res;
};
// console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));
var partitionLabels = function (s) {
  let res = [];
  let map = new Map();
  let flag = 0;
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], i)
  }
  for (let i = 0; i < s.length; i++) {
    let key = map.get(s[i]);
    flag = Math.max(flag, key)
    if (i === flag) {
      res.push(i);
    }
  }
  if (res.length === 0) res.push(s.length);
  return res;
};

// console.log(partitionLabels("eccbbbbdec"));
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
let result = []
let temp = []
var combine = function (n, k) {
  backTracking(n, k, 1)
  return result
};

const backTracking = (n, k, startIndex) => {
  if (temp.length === k) {
    result.push([...temp])
    return;
  }
  for (let i = startIndex; i <= n; i++) {
    temp.push(i)
    backTracking(n, k, i + 1);
    temp.pop();
  }
}

// console.log(combine(3,2));

// 数组去重
// Array.from(new Set(arr.map(JSON.stringify)), JSON.parse);

// console.log(
//   [ [ 3 ], [ 9, 20 ], [ 15, 7 ] ].map(item =>{
//     let length = item.length;
//     return item.reduce((pre,cur) => pre + cur) / length
//   })
// );

