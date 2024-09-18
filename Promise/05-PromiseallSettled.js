/*
    Promise.allSettled([])方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。 
    - 以数组形式返回全部结果，不管成功还是失败
    适合在需要等待多个异步操作完成，并且不关心它们的成功或失败状态时使用。它确保所有 Promise 都已完成后再返回结果
*/

function PromiseallSettled(promises) {
    return new Promise((resolve, reject) => {
        let results = [];   // 结果数组，收集所有Promise结果
        let currentNum = 0; // 计数器，跟踪Promise完成个数

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = { status: 'fulfilled', value: value }; // 成功就存储结果到数组
                })
                .catch((reason) => {
                    results[index] = { status: 'rejected', reason: reason };    // 失败就存储结果到数组
                })
                .finally(() => {
                    currentNum++;
                    if (currentNum === promises.length) {
                        resolve(results);   // 全部完成就返回所有结果
                    }
                })
        })

        if (promises.length === 0) {
            resolve(results);   // 如果输入的数组为空，直接解决
        }

    })
}

// 测试
const p1 = Promise.resolve(33);
const p2 = new Promise((resolve) => setTimeout(resolve, 0, 66));
const p3 = 99;
const p4 = Promise.reject(new Error("an error"));

PromiseallSettled([p1, p2, p3, p4]).then((values) => console.log(values)); 