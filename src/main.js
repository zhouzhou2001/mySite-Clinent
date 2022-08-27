// import "@/mock"; //导入模拟数据
import Vue from "vue"; //导入vue
import App from "./App.vue"; //导入App组件
import "@/styles/global.less"; //导入全局样式
import router from "@/router"; //导入路由
import "./eventBus"; //事件总线

import store from "./store"; //仓库
store.dispatch("setting/fatchSetting");

// 注册Vue实例方法
import { showMessage } from "@/utils";
Vue.prototype.$showMessage = showMessage;

//注册自定义指令
import vloading from "@/directives/loading";
import vlazy from "@/directives/lazy";
Vue.directive("loading", vloading);
Vue.directive("lazy", vlazy);

//创建vue实例
new Vue({
  store,
  router,
  render: (h) => h(App), //渲染组件
}).$mount("#app");
