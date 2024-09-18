/*
    Promise.any([]) 接受一个可迭代对象（如数组）作为参数，返回一个新的 Promise 实例
    - 只返回第一个成功解决的 promise 的结果
    - 或如果全都失败，则返回 AggregateError 实例，这是 Error 的子类，包含了所有 Promise 的拒绝原因
    用途：提高响应性：在多个相似的请求中选择最快的一个，可以减少等待时间，提高应用程序的响应性。
*/

function PromiseAny(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            reject(new AggregateError(results, 'All promises were rejected'));  // 如果输入的数组为空，直接拒绝
        }

        let results = [];
        let currentNum = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    resolve(value)
                })
                .catch((reason) => {
                    results[index] = reason;
                    currentNum++;
                    if (currentNum === promises.length) {
                        // reject(results); // 格式不对
                        reject(new AggregateError(results, 'All promises were rejected'));  // 全部失败，需要返回 AggregateError 实例
                    }
                })
        })

    })
}

// 测试
const p1 = new Promise((resolve) => setTimeout(resolve, 100, 'one'));
const p2 = new Promise((resolve) => setTimeout(resolve, 200, 'two'));
const p3 = new Promise((resolve) => setTimeout(resolve, 300, 'three'));

PromiseAny([p1, p2, p3]).then((value) => {
    console.log(value); // 输出: "one"
})