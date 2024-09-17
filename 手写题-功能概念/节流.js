// 逻辑：在一段时间内只执行一次目标函数，减少高频事件的触发次数
// 适用场景：窗口调整resize、页面滚动scroll、鼠标移动mousemove等事件
function throttle(func, wait) {
    let lastTime = 0;

    return function (...args) {
        const now = Date.now();
        // 比较两个时间的差值和等待时间，判断是否执行回调函数
        if (now - lastTime >= wait) {
            lastTime = now; // 更新触发时间
            func.apply(this, args);
        }
    };
}

// 使用
window.addEventListener('resize', throttle(() => {
    console.log('Window resized');
}, 200));

// 防抖：适用于需要在用户停止触发事件后执行操作的场景，如表单提交和搜索框输入。
// 节流：适用于需要在高频率事件触发时限制执行次数的场景，如滚动事件和鼠标移动事件。