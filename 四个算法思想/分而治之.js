/*
分而治之是一种算法设计思想
核心思想：是将一个复杂的问题拆成多个小问题并解决，然后将子问题的解合并得到原问题的解。
分而治之算法通常包括以下三个步骤：
1. 分解：将原问题分解成若干个规模较小的子问题。
2. 解决：递归地解决这些子问题。如果子问题足够小，则直接解决。
3. 合并：将子问题的解合并得到原问题的解。

归并排序就使用了分而治之的思想
*/

function mergeSort(arr) {
    if (arr.length < 2) return arr; // 递归结束条件：数组长度小于2

    // 选择中间值，将数组分成两半
    let middle = Math.floor(arr.length / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);

    // 先递归调用，不断分割成更小的子数组，直到每个子数组的长度小于 2
    // 长度小于2的数组天然是有序的
    // 最后执行合并操作
    return merge(mergeSort(left), mergeSort(right));
}

// 此时传入的 left 和 right 都是有序数组
function merge(left, right) {
    let result = []; // 保存合并后的结果

    // 循环比较两个数组的首位元素，将较小的元素 push 到 result 中
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    // 上述比较过程，最终一定会有一个数组为空
    // 此时处理非空数组，将其剩余元素全部推入结果数组
    // 由于 left 和 right 都是有序数组，所以剩余元素一定大于 result 中的所有元素

    // 如果左侧有剩余，将左侧剩余元素全部推入结果数组
    while (left.length) {
        result.push(left.shift());
    }

    // 如果右侧有剩余，将右侧剩余元素全部推入结果数组
    while (right.length) {
        result.push(right.shift());
    }

    return result;
}
