// 层层拷贝，所有类型的属性值都会被复制，原对象的修改不会影响拷贝后的对象
function deepClone(obj) {
    if (obj === null) return null   // null的情况
    if (typeof obj !== 'object') return obj // 基本类型直接返回
    if (obj instanceof Date) return new Date(obj)   // 日期对象
    if (obj instanceof RegExp) return new RegExp(obj)   // 正则对象

    // 使用 obj 的构造函数创建一个新的对象实例，可以确保新创建的对象与原对象具有相同的类型
    let newObj = new obj.constructor
    for (let key in obj) {
        // 确保属性是对象自身的属性，而不是从原型链继承的属性
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]) // 递归调用 deepClone 函数，拷贝属性值
        }
    }
    return newObj
}

// 测试
const obj = {
    a: 1,
    b: {
        c: 2,
        d: 3
    },
    e: [4, 5, 6],
    f: new Date(),
    g: /abc/
}
const obj2 = deepClone(obj)
console.log(obj2) 