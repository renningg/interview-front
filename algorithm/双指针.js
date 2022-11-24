/*
    主要练习双指针解题
    但是此类删除数组中重复项的问题，还可用数组的splice，ES6的new Set()进行去重
*/


// 题目：
// 给定一个数组[1,2,0,5,6,4,0,3],只操作原数组的情况下，将所有的0删除，并不改变非0的相对顺序
let arr = [1, 2, 0, 5, 6, 4, 0, 3]
function moveZero(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr
}

// 283.移动零
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
var moveZeroes = function (nums) {
    // 快慢指针。快指针判断当前值是否为0，若非0，将当前值给慢指针，最后统计0的个数，再补齐数组
    let i = -1;
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] != 0) {
            i++
            nums[i] = nums[j]
        }
    }
    for (let k = i + 1; k < nums.length; k++) {
        nums[k] = 0
    }
    return nums
};



/**
 *  27. 移除元素
 *  给你一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，并返回移除后数组的新长度。
    不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
    元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

    示例 1：
    输入：nums = [3,2,2,3], val = 3
    输出：2, nums = [2,2]
    解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，
    而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
    
    示例 2：
    输入：nums = [0,1,2,2,3,0,4,2], val = 2
    输出：5, nums = [0,1,4,0,3]
    解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。
    你不需要考虑数组中超出新长度后面的元素。
 */

var removeElement = function (nums, val) {
    let i = -1
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] != val) {
            i++
            nums[i] = nums[j]
        }
    }
    return i + 1;
};

/**
 * 26. 删除有序数组中的重复项
 * 
    示例 1：
    输入：nums = [1,1,2]
    输出：2, nums = [1,2,_]
    解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
    
    示例 2：
    输入：nums = [0,0,1,1,1,2,2,3,3,4]
    输出：5, nums = [0,1,2,3,4]
    解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
 * 
 */
var removeDuplicates = function (nums) {
    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[i] == nums[j]) {
            nums.splice(j, 1)
            j--
        } else {
            i++
        }
    }
    return nums.length
}

/**
 * 1. 两数之和
 * 示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
 */
var twoSum = function (nums, target) {
    let result = []
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                result.push(i, j)
            }
        }
    }
    return result
};

/**
 * 167. 两数之和 II - 输入有序数组
 * 
 *  示例 1：
    输入：numbers = [2,7,11,15], target = 9
    输出：[1,2]
    解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。

    示例 2：
    输入：numbers = [2,3,4], target = 6
    输出：[1,3]
    解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。

    [1,2,3,4,5,6]   7   [2,5,3,4]
 */

// var twoSumPlus = function (numbers, target) {
//     let result = []
//     for (let i = 0; i < numbers.length; i++) {
//         for (let j = i + 1; j < numbers.length; j++) {
//             if (numbers[i] + numbers[j] == target) {
//                 result.push(i + 1, j + 1)
//             }
//         }
//     }
//     return result
// };

var twoSumPlus = function (numbers, target) {
    let mySet = new Set()
    for (let i = 0; i < numbers.length; i++) {
        if (numbers.indexOf(target - numbers[i]) != -1 && !mySet.has(numbers.indexOf(target - numbers[i]) + 1) && numbers.indexOf(target - numbers[i]) != i) {
            mySet.add(i + 1)
            mySet.add(numbers.indexOf(target - numbers[i]) + 1)
        }
    }
    return [...mySet].sort((a, b) => a - b)
};

console.log(twoSumPlus([0, 0, 3, 4], 0));



