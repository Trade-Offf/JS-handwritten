// 二分搜索只能搜索已经排序好的数据。
// 一层循环，比较数组中间值与目标值大小，得知目标数据是在数组的左边还是右边。

function binarySearch(arr, target) {
    // 初始化左右指针
    let left = 0;
    let right = arr.length - 1;

    // 当左指针不超过右指针时继续搜索
    while (left <= right) {
        // 计算中间索引
        let mid = left + Math.floor((right - left) / 2);

        // 如果中间元素等于目标元素，返回中间索引
        if (arr[mid] === target) {
            return mid;
        }
        // 如果中间元素小于目标元素，调整左指针
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        // 如果中间元素大于目标元素，调整右指针
        else {
            right = mid - 1;
        }
    }

    // 如果未找到目标元素，返回 -1
    return -1;
}
// 测试
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(binarySearch(arr, 6)); // 5

/*
* 时间复杂度
*   最优情况: O(1)（目标元素在中间位置）
*   最坏情况: O(log n)（每次将搜索范围缩小一半）
*   平均情况: O(log n)
* 空间复杂度: O(1)
*/