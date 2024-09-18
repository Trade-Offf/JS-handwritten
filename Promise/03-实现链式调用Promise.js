/*
* 实现链式调用，需要在 then 方法中返回一个新的 MyPromise 实例
* 然后把原来的状态判断移进来
* 但是 setTimeout 内部需要执行 onFulfilled 和 onRejected ，得到结果后再调用 resolve 和 reject
*/

function MyPromise(fn) {
    this.state = "PENDING";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = []; // 存储成功的回调函数
    this.onRejectedCallbacks = [];  // 存储失败的回调函数

    const resolve = (value) => {
        if (this.state === 'PENDING') {
            this.state = 'FULFILLED'
            this.value = value
            this.onFulfilledCallbacks.forEach(fn => fn(value))
        }
    }
    const reject = (reason) => {
        if (this.state === 'PENDING') {
            this.state = 'REJECTED';
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn => fn(reason))
        }
    }

    this.then = (onFulfilled, onRejected) => {
        // 设置默认处理函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

        return new MyPromise((resolve, reject) => {
            // 如果this.state === 'PENDING'，说明 promise 还没有执行完
            if (this.state === 'PENDING') {
                // 将 then 中的回调函数存储起来，等到 promise 执行完后再执行
                this.onFulfilledCallbacks.push((value) => {
                    setTimeout(() => {
                        try {
                            const result = onFulfilled(value);
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);


                });
                this.onRejectedCallbacks.push((reason) => {
                    setTimeout(() => {
                        try {
                            const result = onRejected(reason)
                            resolve(result)
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }

            // 如果状态已经是 FULFILLED 或 REJECTED，直接异步执行回调函数
            if (this.state === 'FULFILLED') {
                setTimeout(() => {
                    try {
                        const result = onFulfilled(this.value);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (this.state === 'REJECTED') {
                setTimeout(() => {
                    try {
                        const result = onRejected(this.reason);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
        })


    }

    this.catch = (onRejected) => {
        return this.then(null, onRejected);
    };

    this.finally = (callback) => {
        return this.then(
            value => {
                callback();
                return value;
            },
            reason => {
                callback();
                throw reason;
            }
        );
    };

    try {
        fn(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

// 执行以下代码，测试自己实现的 Promise 是否正确
const myPromise = new MyPromise((resolve, reject) => {
    console.log('第一步')
    setTimeout(() => {
        console.log('第三步')
        resolve('最后一步 hello world')
        console.log('第四步')
    }, 2000)
    console.log('第二步')
})
myPromise.then((value) => {
    console.log(value)
})