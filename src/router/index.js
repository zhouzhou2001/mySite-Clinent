import Vue from "vue"; //导入vue
import VueRouter from "vue-router"; //导入路由
import routes from "@/router/routes"; //导入路由匹配规则
import { titleController } from "@/utils";

//vue安装路由插件
if (!window.VueRouter) {
  Vue.use(VueRouter);
}

//创建路由
const router = new VueRouter({
  routes, //路由匹配规则
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.path === "/index.html") {
    next("/");
  }
  next();
});
router.afterEach((to) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});

export default router;
