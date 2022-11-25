/**
 * 15，三数之和
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，
 * 同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
    你返回所有和为 0 且不重复的三元组。
    注意：答案中不可以包含重复的三元组。

    示例 1：
    输入：nums = [-1,0,1,2,-1,-4]
    输出：[[-1,-1,2],[-1,0,1]]
    解释：
    nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
    nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
    nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
    不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
    注意，输出的顺序和三元组的顺序并不重要。

    示例 2：
    输入：nums = [0,1,1]
    输出：[]
    解释：唯一可能的三元组和不为 0 。

    示例 3：
    输入：nums = [0,0,0]
    输出：[[0,0,0]]
    解释：唯一可能的三元组和为 0 。
 */
// 思路：
// 首先将数组排序，利用左右指针

var threeSum = function (nums) {
    nums.sort((num1, num2) => num1 - num2);
    let result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) return result; //因为求三数之和为0，如果第一个值已经大于0，那后面不可能有解了，就直接返回结果
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            if (nums[i] + nums[left] + nums[right] == 0) {
                result.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
            } else {
                nums[i] + nums[left] + nums[right] > 0 ? right-- : left++;
            }
            while (left > i + 1 && nums[left] == nums[left - 1]) left++;
            while (right < nums.length - 1 && nums[right] == nums[right + 1]) right--;
        }
    }
    return result;
};


function test(nums) {
    let arr = nums.sort((a,b)=>a-b)
    let result = []
    let n = arr.length
    if(arr[0] >= 0) return []
    let left,right;
    for (let i = 0; i < n; i++) {
        left = i + 1;
        right = n - 1
        while (left < right) {
            if(arr[i] + arr[left] + arr[right] == 0){
                result.push([arr[i] , arr[left] , arr[right]])
                left++;
                right--;
            } else {
                arr[i] + arr[left] + arr[right] > 0 ? right-- : left++
            }
            while(left > i + 1 && arr[left] == arr[left - 1]) left++
            while(right < n - 1 && arr[right] == arr[right + 1]) right--
        }
        

        
    }
}

