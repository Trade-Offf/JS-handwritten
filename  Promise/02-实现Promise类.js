

class MyPromise {
    constructor(fn) {
        this.state = 'PENDING';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        fn(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        if (this.state === 'PENDING') {
            this.state = 'FULFILLED';
            this.value = value;
            this.onFulfilledCallbacks.forEach(fn => fn(value))
        }
    }

    reject(reason) {
        if (this.state === 'PENDING') {
            this.state = 'REJECTED';
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn => fn(reason))
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

        if (this.state === 'PENDING') {
            this.onFulfilledCallbacks.push((value) => {
                setTimeout(() => { onFulfilled(value) }, 0);
            });
            this.onRejectedCallbacks.push((reason) => setTimeout(() => { onRejected(reason) }, 0));
        }
        if (this.state === 'FULFILLED') {
            setTimeout(() => { onFulfilled(this.value) }, 0)

        }
        if (this.state === 'REJECTED') {
            setTimeout(() => { onRejected(this.reason) }, 0)
        }
    }
}

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