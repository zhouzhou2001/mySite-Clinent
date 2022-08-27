<template>
  <div class="blog-category-container">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { getBlogCategory } from "@/api/blog";
import fatchData from "@/mixins/fatchData";

export default {
  mixins: [fatchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryid || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const tolalArticle = this.data.reduce((a, b) => a + b.articleCount, 0);
      const list = [
        { name: "全部", id: -1, articleCount: tolalArticle },
        ...this.data,
      ];
      return list.map((it) => ({
        ...it,
        isSelect: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fatchData() {
      return await getBlogCategory();
    },
    //处理点击事件
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      if (item.id === -1) {
        this.$router
          .push({
            name: "Blog",
          })
          .catch(() => {
            this.$showMessage({
              content: "请不要重复加载当前页面",
              type: "error",
            });
          });
      } else {
        this.$router
          .push({
            name: "Category",
            query: { ...query },
            params: {
              categoryId: item.id,
            },
          })
          .catch(() => {
            this.$showMessage({
              content: "请不要重复加载当前页面",
              type: "error",
            });
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  overflow-x: hidden;
  box-sizing: border-box;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>