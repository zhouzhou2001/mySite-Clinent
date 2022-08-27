<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="gist">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期:{{ formatDate(item.createDate) }}</span>
            <span>浏览:{{ item.scanNumber }}</span>
            <span>评论:{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'Category',
                params: { categoryId: item.category.id },
              }"
              >{{ item.category.name }}</RouterLink
            >
          </div>
          <p class="describe">{{ item.description }}</p>
        </div>
      </li>
      <Empty v-if="data.rows.length === 0 && !isLoading" />
      <Pager
        v-if="data.total"
        @pageChange="handlePageChange"
        :current="this.routeInfo.page"
        :total="data.total"
        :limit="this.routeInfo.limit"
      />
    </ul>
  </div>
</template>

<script>
//获取blog数据
import Pager from "@/components/Pager";
import { getBlog } from "@/api/blog";
import fatchData from "@/mixins/fatchData";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll";
import Empty from "@/components/Empty";

export default {
  mixins: [fatchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  components: {
    Pager,
    Empty,
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      let page = +this.$route.query.page || 1;
      let limit = +this.$route.query.limit || 10;
      let categoryId = this.$route.params.categoryId || -1;
      return { page, limit, categoryId };
    },
  },
  methods: {
    formatDate,
    //获取文章博客
    async fatchData() {
      return await getBlog(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    //处理页面跳转
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // 当前没有分类
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "Category",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fatchData();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  // min-width: 800px;
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .gist {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      // max-height: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .describe {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>