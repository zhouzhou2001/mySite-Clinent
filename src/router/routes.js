//导出路由匹配规则
import NotFound from "@/views/NotFound";
import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";
configure({
  trickleRate: 0.5,
  trickleSpeed: 200,
  showSpinner: false,
});
//延迟
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
//获取页面组件
function getPageComponent(pageComponent) {
  return async () => {
    start();
    if (process.env.NODE_ENV === "development") {
      await delay(3000);
    }
    const response = await pageComponent();
    done();
    return response;
  };
}

export default [
  {
    name: "Home",
    path: "/",
    component: getPageComponent(() =>
      import(/* webpackChunkName: "home" */ "@/views/Home")
    ),
    meta: {
      title: "首页",
    },
  },
  {
    name: "Blog",
    path: "/Blog",
    component: getPageComponent(() =>
      import(/* webpackChunkName:"blog" */ "@/views/Blog")
    ),
    meta: {
      title: "文章",
    },
  },
  {
    name: "Category",
    path: "/Blog/cate/:categoryId",
    component: getPageComponent(() =>
      import(/* webpackChunkName:"blogcategory" */ "@/views/Blog")
    ),
    meta: {
      title: "文章分类",
    },
  },
  {
    name: "BlogDetail",
    path: "/Blog/:id",
    component: getPageComponent(() =>
      import(/* webpackChunkName:"blogDetail" */ "@/views/Blog/Detail")
    ),
    meta: {
      title: "文章详情",
    },
  },
  {
    name: "About",
    path: "/About",
    component: getPageComponent(() =>
      import(/* webpackChunkName:"about" */ "@/views/About")
    ),
    meta: {
      title: "关于我",
    },
  },
  {
    name: "Project",
    path: "/Project",
    component: getPageComponent(() =>
      import(/* webpackChunkName:"project" */ "@/views/Project")
    ),
    meta: {
      title: "项目&效果",
    },
  },
  {
    name: "Message",
    path: "/Message",
    component: getPageComponent(() =>
      import(/* webpackChunkName:"message" */ "@/views/Message")
    ),
    meta: {
      title: "留言",
    },
  },
  {
    name: "NotFound",
    path: "*",
    component: NotFound,
  },
];
