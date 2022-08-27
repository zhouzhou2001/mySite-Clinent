import getComponentRootDom from "@/utils/getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "@/utils/showMessage.module.less";

/**
 *  弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 显示消息的容器
 */
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "";
    const duration = options.duration || 2000;
    const container =
        options.container ||
        document.getElementsByClassName("app-container")[0];
    //创建元素
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(Icon, { type });
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    //设置样式
    const typeClassName = styles[`message-${type}`]; //类型样式
    div.className = `${styles.message} ${typeClassName}`;

    //容器的position是否被改动
    if (getComputedStyle(container).position === "static") {
        container.style.position = "relative";
    }
    //将div添加到容器中
    container.appendChild(div);

    //浏览器强行渲染
    div.clientHeight; //导致reflow

    //出现
    div.style.opacity = "1";
    div.style.transform = "translate(-50%, -50%) translateY(0)";

    //一段时间后消失
    setTimeout(() => {
        div.style.opacity = "0";
        div.style.transform = "translate(-50%, -50%) translateY(-20px)";
        div.addEventListener(
            "transitionend",
            () => {
                div.remove();
                options.callback && options.callback();
            },
            { once: true }
        );
    }, duration);
}
