<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>
<script>
//类名映射
const classMap = {
  error: "icon-cuowu",
  shangjiantou: "icon-xiangshang",
  xiajiantou: "icon-xiangxia",
  success: "icon-zhengque",
  warn: "icon-jinggao",
  info: "icon-xinxi-yuankuang",
  code: "icon-code",
  github: "icon-github-fill",
  qq: "icon-QQ-circle-fill",
  guanbi: "icon-guanbi",
  home: "icon-shouye",
  liuyan: "icon-liuyanfill",
  weixin: "icon-weixin",
  blog: "icon-blog",
  about: "icon-set_about_hov",
  email: "icon-email-fill",
  empty: "icon-empty",
};

export default {
  //属性
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  //计算属性
  computed: {
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>
<style scoped>
@import "//at.alicdn.com/t/font_3436431_5bc3nse3qsk.css";
</style>