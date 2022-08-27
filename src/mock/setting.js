import Mock from "mockjs";
import qqPng from "@/assets/qq.png";
import weixinPng from "@/assets/weixin.png";

Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar:
      "https://tva4.sinaimg.cn/crop.0.0.641.641.180/68a0d5e5jw8ek4bc8ry9dj20ht0ht756.jpg?KID=imgbed,tva&Expires=1658837020&ssig=XVp8RoUOQb",
    siteTitle: "前端彭于晏博客",
    github: "https://github.com/zhouzhou2001",
    githubName: "zhouzhou2001",
    qq: "3165217629",
    qqQrCode: qqPng,
    weixin: "17779279245",
    weixinQrCode: weixinPng,
    mail: "3165217629@qq.com",
    icp: "备案号",
    favicon:
      "https://tva4.sinaimg.cn/crop.0.0.641.641.180/68a0d5e5jw8ek4bc8ry9dj20ht0ht756.jpg?KID=imgbed,tva&Expires=1658837020&ssig=XVp8RoUOQb",
  },
});
