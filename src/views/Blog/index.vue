<template>
  <Layout>
    <BlogList />
    <template #right>
      <div class="right-blog">
        <BlogCategory />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogCategory from "./components/BlogCategory";
import BlogList from "./components/BlogList";
export default {
  components: {
    Layout,
    BlogCategory,
    BlogList,
  },
};
</script>

<style lang="less" scoped>
.right-blog {
  width: 280px;
  height: 100%;
}
</style>