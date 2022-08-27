<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { deBounce } from "@/utils";

export default {
  components: { RightList },
  data() {
    return {
      activeAnchor: "",
    };
  },
  props: {
    toc: {
      type: Array,
    },
  },
  computed: {
    //根据toc属性以及activeAnchor得到带有isSelect属性的数字toc
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    //根据toc得到他们对应的元素数组
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  methods: {
    //刷新锚点
    handleSelect(item) {
      location.hash = item.anchor;
    },
    //设置activeAnchor的准确值
    setSelect(scrollDom) {
      //没有dom元素则不做任何处理
      if (!scrollDom) {
        return;
      }
      this.activeAnchor = "";
      const range = 200; //设置范围
      //看看当前dom是否应该被选中
      for (let dom of this.doms) {
        if (!dom) {
          continue;
        }
        //得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          //在范围内
          this.activeAnchor = dom.id;
        } else if (top > range) {
          //在范围下方
          return;
        } else {
          //在范围上方
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  created() {
    this.setSelectDebounce = deBounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  // padding: 20px;
  overflow: hidden;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>