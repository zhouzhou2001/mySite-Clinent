<template>
  <div class="blog-comment-container">
    <MessageArea
      :title="'评论'"
      :subTitle="`(${data.total || 0})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fatchData from "@/mixins/fatchData";
import { getComment, postComment } from "@/api/blog";

export default {
  mixins: [fatchData({})],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    //根据已加载评论数和总评论数判断是否能加载评论
    hasMore() {
      return this.data.rows.length > this.data.total;
    },
  },
  methods: {
    //获取评论
    async fatchData() {
      return await getComment(this.$route.params.id, this.page, this.limit);
    },
    //加载更多评论
    async fatchMore() {
      //没有跟多评论
      if (this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fatchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    //提交评论
    async handleSubmit(dataForm, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...dataForm,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("提交成功");
    },
    //滚动到底部加载跟多评论
    handleMainScroll(dom) {
      //加载中或者没有dom元素不执行
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100; //可接受容错范围
      const distance = dom.scrollHeight - (dom.scrollTop + dom.clientHeight);
      if (distance < range) {
        this.fatchMore();
      }
    },
  },
  created() {
    //监听mainScroll事件
    this.$bus.$on("mainScroll", this.handleMainScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleMainScroll);
  },
};
</script>

<style lang="less" scoped>
.blog-comment-comtainer {
  margin: 30px 0;
}
</style>