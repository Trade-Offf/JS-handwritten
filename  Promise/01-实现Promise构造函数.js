/*
* Promise 的核心功能实现，不支持链式调用
* 实现了 then、catch、finally方法
* 利用 setTimeout 实现异步逻辑
* 设置了默认处理函数，如果 onFulfilled 或 onRejected 不是函数，我们需要忽略它们，让值穿透
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

        // 如果this.state === 'PENDING'，说明 promise 还没有执行完
        if (this.state === 'PENDING') {
            // 将 then 中的回调函数存储起来，等到 promise 执行完后再执行
            this.onFulfilledCallbacks.push((value) => {
                setTimeout(() => onFulfilled(value), 0);
            });
            this.onRejectedCallbacks.push((reason) => {
                setTimeout(() => onRejected(reason), 0);
            });
        }

        // 如果状态已经是 FULFILLED 或 REJECTED，直接异步执行回调函数
        if (this.state === 'FULFILLED') {
            setTimeout(() => onFulfilled(this.value), 0);
        }
        if (this.state === 'REJECTED') {
            setTimeout(() => onRejected(this.reason), 0);
        }
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