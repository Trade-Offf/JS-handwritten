/*
    Promise.race([])
    接受一个可迭代对象（如数组）作为参数，返回一个新的 Promise 实例
    - 只返回第一个完成的结果，不管是成功还是失败
*/

function PromiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            // 使用 Promise.resolve(promise) 确保每个元素都是一个 Promise 对象
            Promise.resolve(promise)
                .then(value => {
                    resolve(value)
                })
                .catch(reason => {
                    reject(reason)
                })
        })
    })
}


const promise1 = new Promise((resolve, reject) => setTimeout(resolve, 500, '一'));  // 500ms后变为成功状态
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, '二'));   // 100ms后变为拒绝状态

PromiseRace([promise1, promise2]).then((value) => {
    console.log(value);
}).catch((error) => {
    console.log(error); // 输出: "二"，因为 promise2 更快地变为拒绝状态
});