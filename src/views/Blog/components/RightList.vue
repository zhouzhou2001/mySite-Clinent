<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span :class="{ select: item.isSelect }" @click="handleClick(item)">{{
        item.name
      }}</span>
      <span
        @click="handleClick(item)"
        class="aside"
        v-if="item.aside"
        :class="{ select: item.isSelect }"
        >{{ item.aside }}</span
      >
      <RightList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    //抛出点击事件
    handleClick(item) {
      if (!this.isSelect) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-list-container {
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    .select {
      color: @warn;
      font-weight: bold;
    }
  }
  .aside {
    font-size: 12px;
    margin-left: 1em;
    color: @gray;
  }
}
</style>