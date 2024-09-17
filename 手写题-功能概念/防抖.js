// 逻辑：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
// 使用场景：输入框输入监听事件、滚动事件、按钮点击等。
function debounce(func, wait) {
    let timeId;

    return function (...args) {
        clearTimeout(timeId);	// 清除上次的定时器

        // 新建本次的定时器，并在 wait 毫秒后执行回调
        timeId = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

// 使用
const input = document.querySelector('input');

input.addEventListener('input', debounce(() => {
    console.log('Input event');
}, 300));