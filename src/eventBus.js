import Vue from "vue";

//添加事件总线实例
const vm = new Vue({});
Vue.prototype.$bus = vm;

export default vm;
/**
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数
 * -滚动的Dom元素，如果为undefined则dom元素不存在
 */
/**
 * 事件名：setMainScroll
 * 含义：设置主区域滚动条位置
 * 参数
 * -滚动条高度
 */
