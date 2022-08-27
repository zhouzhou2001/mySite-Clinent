<template>
  <nav class="menu-container">
    <router-link
      v-for="item in items"
      :to="{ name: item.name }"
      :key="item.link"
      :exact="item.exact"
      active-class="selected"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </router-link>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
import "@/styles/global.less";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        { name: "Home", icon: "home", title: "首页", exact: true },
        { name: "Blog", icon: "blog", title: "文章", exact: false },
        { name: "About", icon: "about", title: "关于我", exact: true },
        { name: "Project", icon: "code", title: "项目&效果", exact: true },
        { name: "Message", icon: "liuyan", title: "留言版", exact: true },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    display: block;
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 50px;
    &.selected {
      background-color: darken(@words, 3%);
    }
    &:hover {
      color: #fff;
    }
  }
}
.icon {
  width: 24px;
}
</style>