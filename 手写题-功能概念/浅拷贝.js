// 拷贝是拷贝对象显式具有的属性，所以在拷贝前要先判断该属性是不是对象显式具有的。

function shallowCopy(obj) {
    let newObj = {}; // 创建一个新的空对象，用于存储拷贝的内容

    // 遍历原对象的所有属性
    for (let key in obj) {
        // 判断该属性是否是原对象显式具有的属性
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]; // 将属性值复制到新对象中
        }
    }

    return newObj; // 返回新对象
}

// 测试
const obj = {
    a: 1,
    b: {
        c: 2
    }
};
const obj2 = shallowCopy(obj);
console.log(obj2); // { a: 1, b: { c: 2 } }