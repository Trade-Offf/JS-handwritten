/**
 * 选择排序本质: 每次从待排序的数据元素中选出最小的一个元素放在序列的起始位置
 * 两层循环：
 *   外层循环，负责遍历数组的每一个元素
 *   内层循环，负责从当前元素的下一个元素开始遍历，寻找最小的元素
 */
function selectionSort(arr) {
    const len = arr.length; // 获取数组的长度
    let minIndex; // 最小元素的索引

    // 外层循环遍历数组的每一个元素
    for (let i = 0; i < len - 1; i++) {
        minIndex = i; // 假设当前元素是最小的

        // 内层循环从当前元素的下一个元素开始遍历
        for (let j = i + 1; j < len; j++) {
            // 如果找到比当前假设的最小元素更小的元素
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // 更新最小元素的索引
            }
        }

        // 如果最小元素不是当前元素，则交换它们
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];  // 解构赋值写法，交换两个元素
        }
    }

    return arr;
}
// 测试
let arr = [5, 3, 8, 4, 4, 2, 0, 1]
console.log(selectionSort(arr)) // [0, 1, 2, 3, 4, 4, 5, 8]

/*
* 时间复杂度：O(n^2)，无论什么情况，时间复杂度都是 O(n^2)，因为用了两层嵌套循环
* 空间复杂度：O(1)，原地排序算法，不需要额外的存储空间，除了几个临时变量
*/