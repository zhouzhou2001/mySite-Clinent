<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <!-- 首页 -->
    <a
      href="#"
      @click="handleClick(1)"
      :class="{ disabled: current === 1 ? true : false }"
      >|&lt;&lt;</a
    >
    <!-- 上一页 -->
    <a
      href="#"
      @click="handleClick(current - 1)"
      :class="{ disabled: current === 1 ? true : false }"
      >&lt;&lt;</a
    >
    <!-- 页码 -->
    <a
      href="#"
      @click="handleClick(n)"
      :class="{ active: current === n ? true : false }"
      v-for="(n, i) in pageArr"
      :key="i"
      >{{ n }}</a
    >
    <!-- 下一页 -->
    <a
      href="#"
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumber ? true : false }"
      >&gt;&gt;</a
    >
    <!-- 尾页 -->
    <a
      href="#"
      @click="handleClick(pageNumber)"
      :class="{ disabled: current === pageNumber ? true : false }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  //属性
  props: {
    //当前页
    current: {
      type: Number,
      default: 1,
    },
    //总数居量
    total: {
      type: Number,
      default: 0,
    },
    //页容量
    limit: {
      type: Number,
      default: 10,
    },
    //可见页码数
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  //计算属性
  computed: {
    //页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    //页码数组
    pageArr() {
      let arr = [];
      for (let i = this.pageMin; i <= this.pageMax; i++) {
        arr.push(i);
      }
      return arr;
    },
    //最小页码
    pageMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    //最大页码
    pageMax() {
      let max = this.pageMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
  },
  methods: {
    handleClick(newPage) {
      //判断触发pageChnage事件范围
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      //抛出事件
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

//Pager容器样式
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  //Pager的a标签的样式
  a {
    text-decoration: none;
    color: @primary;
    margin: 0 6px;
    &.disabled {
      color: @gray;
      cursor: not-allowed;
    }
    &.active {
      color: #f40;
      cursor: pointer;
    }
  }
}
</style>