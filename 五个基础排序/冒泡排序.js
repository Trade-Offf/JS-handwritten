/**
 * 冒泡排序本质: 两两比较相邻元素，每次循环完成 1 个值的排序
 * 有两层循环：外层循环控制循环次数，内层循环控制相邻元素的比较和交换
 * 优化手段：使用一个标记位，如果本次内层循环没发生任何交换，说明数组已经有序，提前退出
 */
function bubbleSort(arr) {
    let len = arr.length; // 获取数组长度

    for (let i = 0; i < len - 1; i++) {
        let flag = false; // 标记位，初始化本轮未发生交换

        for (let j = 0; j < len - 1 - i; j++) {
            // 每次比较相邻元素大小
            if (arr[j] > arr[j + 1]) {
                flag = true; // 有数据交换，标记为 true
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // 解构赋值交换两个元素
            }
        }
        if (!flag) break; // 如果本轮未发生交换，说明数组已经有序，提前退出
    }
    return arr;
}


// 测试用例
let arr = [3, 1, 4, 2, 5];
console.log(bubbleSort(arr)) // [1, 2, 3, 4, 5]

/*
* 时间复杂度：O(n^2)
*   最好情况 O(n)：有序, 遍历一次即可
*   最坏情况 O(n^2)：逆序，每次都要交换
* 空间复杂度：O(1), 原地排序算法，不需要额外的存储空间
*/