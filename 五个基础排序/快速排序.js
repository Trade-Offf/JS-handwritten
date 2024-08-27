/**
 * 快速排序本质: 选个轴枢，把剩余数组分成两组，左边放小的值，右边放大等于的值，递归处理左右两组
 * 优化手段：优化轴枢选择方式，随机选取，避免最坏情况
 */
function quickSort(arr) {
    // 递归结束条件：如果数组长度小于等于1，直接返回数组
    if (arr.length <= 1) return arr;

    // 向下取整，获取基准点的索引
    let pivotIndex = Math.floor(arr.length / 2);

    // 从数组取出基准点
    // splice(start,end) 方法会改变原始数组，删除起止元素，并以数组形式返回被删除的元素
    let pivot = arr.splice(pivotIndex, 1)[0];

    // 定义两个数组，分别存放比基准点小和大的元素
    let left = [], right = [];

    // 遍历数组，将元素按大小分配到left和right数组中
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]); // 比基准点小的放在左边
        } else {
            right.push(arr[i]); // 大于等于基准点的放在右边
        }
    }

    // 递归调用quickSort，对left和right数组进行排序，并将结果合并
    return quickSort(left).concat([pivot], quickSort(right));
}

// 测试用例
let arr = [3, 1, 4, 4, 4, 2, 5];
console.log(quickSort(arr)) // 输出: [1, 2, 3, 4, 5]


/*
* 时间复杂度：O(n log n)
*   最好情况: O(n log n)，每次选择的基准点都是中位数，每次都能均匀的分成两组，
*   最坏情况: O(n^2)，每次选择的基准点都是最大值或最小值，导致分组不均匀
* 空间复杂度：主要取决于递归调用的深度
*   最好情况: O(log n)
*   最坏情况: O(n)，每次基准点都是最大值或最小值，递归调用 n 次
*/