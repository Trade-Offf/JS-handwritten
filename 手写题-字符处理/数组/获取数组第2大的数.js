// 实现获取数组第 2 大的数

// 方法一：排序
// 时间复杂度 O(nlogn)
function getSecondMax(arr) {
    arr.sort((a, b) => b - a);
    return arr[1];
}

// 方法二：遍历
// 时间复杂度 O(n)
function getSecondMax(arr) {
    let max = -Infinity;
    let secondMax = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {   // 如果当前元素大于最大值
            secondMax = max;    // 更新第二大值
            max = arr[i];       // 更新最大值
        } else if (arr[i] > secondMax && arr[i] < max) {    // 如果当前元素大于第二大值且小于最大值
            secondMax = arr[i]; // 更新第二大值
        }
    }

    return secondMax;
}

