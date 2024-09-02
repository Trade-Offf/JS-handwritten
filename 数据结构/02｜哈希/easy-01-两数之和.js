/*
    题目：1. 两数之和（easy）
    描述：给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那两个整数，并返回它们的数组下标。
    你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
    你可以按任意顺序返回答案。

    示例：
    输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
*/

// 方法一：暴力解法
// 时间复杂度：O(n^2)，其中 n 是数组中的元素数量。最坏情况下，数组中任意两个数都要被匹配一次。
// 空间复杂度：O(1)。
var twoSum = function (nums, target) {
    const len = nums.length;

    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 进阶解法：你可以想出一个时间复杂度小于 O(n2) 的算法吗？用哈希解决
// 时间复杂度：O(n)，其中 n 是数组中的元素数量。对于每一个元素 x，我们可以 O(1) 地寻找 target - x。
// 空间复杂度：O(n)，其中 n 是数组中的元素数量。主要为哈希表的开销。
var twoSum = function (nums, target) {
    const map = new Map();  // 创建一个哈希表

    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];

        // 如果哈希表中存在目标元素，则返回结果
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        // 如果哈希表中不存在目标元素，则将当前元素存入哈希表
        map.set(nums[i], i);
    }
};