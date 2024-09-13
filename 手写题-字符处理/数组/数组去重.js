// 携程面试题：实现一个数组去重的方法，要求时间复杂度最小
// 下面是几种实现方法，时间复杂度都是O(n)

/*
 最简方法：使用Set
 new Set(arr)：创建一个 Set 对象，会自动移除重复的元素
 Array.from()：将 Set 对象转换为数组
*/
function unique(arr) {
    return Array.from(new Set(arr));
}


// 基础方法：使用对象的键值对
// 时间复杂度最小，那么就不能使用双重循环，而是使用对象的键值对来实现
function unique(arr) {
    var obj = {};
    var result = [];

    // 遍历数组
    for (var i = 0; i < arr.length; i++) {
        // 如果对象中不存在当前元素
        if (!obj[arr[i]]) {
            // 将当前元素作为键存入对象中，值设为 true
            obj[arr[i]] = true;
            // 将当前元素添加到结果数组中
            result.push(arr[i]);
        }
    }

    return result;
}

// 优化方法，用 Map 对象来代替普通对象
function uniqueArray(arr) {
    const map = new Map();

    // 向 Map 中添加一个键值对时，如果该键已经存在，值会新的覆盖旧的，但键不会重复
    arr.forEach(item => {
        // 将每个元素作为键存入 Map 中，值设为 true
        map.set(item, true);
    });

    // 最终返回 Map 对象的所有键，并转换为数组
    return [...map.keys()];
}