/*
    Promise.all() 是一个静态方法，接受一个 Promise 对象数组作为参数，返回一个新的 Promise 实例。
    - 全部成功，返回所有结果
    - 任一失败，返回最先失败的任务结果
    用途：用于合并执行多个异步操作的场景，当这些操作相互独立，且你需要等待它们全部完成时。
*/

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let results = [];						// 结果数组，收集所有Promise结果
        let completedPromises = 0;	// 计数器，跟踪成功Promise个数

        promises.forEach((promise, index) => {
            // 使用 Promise.resolve(promise) 可以确保所有传入的值都按照 Promise 的方式处理
            // 避免了在处理过程中出现非 Promise 值导致的错误。
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;	// 成功就存储结果到数组
                    completedPromises += 1;	// 计数器 +1
                    if (completedPromises === promises.length) {
                        resolve(results);	// 全成功就返回所有结果
                    }
                }).catch(error => {
                    reject(error);	// 任意失败，执行拒绝的回调
                });
        });

        if (promises.length === 0) {
            resolve(results); // 如果输入的数组为空，直接解决
        }
    });
}

const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});
const promise2 = Promise.resolve(3);
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
    .then((values) => {
        console.log(values); // [ 'foo', 3, 42 ]
    });