/**
 * 冒泡排序本质: 两两比较相邻元素，每次循环完成 1 个值的排序
 * 有两层循环：外层循环控制循环次数，内层循环控制相邻元素的比较和交换
 * 优化手段：使用一个标记位，如果本次内层循环没发生任何交换，说明数组已经有序，提前退出
 */

function bubbleSort(arr) {
    let len = arr.length; // 获取数组长度
    let newArr = arr.slice(); // 创建数组副本

    for (let i = 0; i < len - 1; i++) {
        let flag = false; // 标记位，初始化本轮未发生交换
        for (let j = 0; j < len - 1 - i; j++) {
            // 每次比较相邻元素大小
            if (newArr[j] > newArr[j + 1]) {
                flag = true; // 有数据交换，标记为 true
                [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]]; // 解构赋值交换两个元素
            }
        }
        if (!flag) break; // 如果本轮未发生交换，说明数组已经有序，提前退出
    }
    return newArr;
}

// 测试用例
let arr = [3, 1, 4, 2, 5]
let sortArr = bubbleSort(arr)
console.log(arr);
console.log(bubbleSort(sortArr)) // [1, 2, 3, 4, 5]
