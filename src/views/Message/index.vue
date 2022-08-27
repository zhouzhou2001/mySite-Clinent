<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言版"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fatchData from "@/mixins/fatchData";
import mainScroll from "@/mixins/mainScroll";
import * as messageApi from "@/api/message";

export default {
  mixins: [fatchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
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
  components: {
    MessageArea,
  },
  methods: {
    //分页获取留言信息
    async fatchData() {
      return await messageApi.getMessage(this.page, this.limit);
    },
    //提交留言
    async handleSubmit(data, callback) {
      const resp = await messageApi.postMessage(data);
      if (resp) {
        callback("感谢您的留言");
        this.data.rows.unshift(resp);
        this.data.total++;
      }
      callback();
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
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 25px 0;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>