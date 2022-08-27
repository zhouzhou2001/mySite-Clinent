//函数防抖
export default function (fuc, duration = 200) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fuc(...args);
        }, duration);
    };
}
