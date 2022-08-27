<template>
  <div class="about-container" v-loading="loading">
    <Empty v-if="!data" />
    <iframe class="about-iframe" :src="data" frameborder="0"></iframe>
  </div>
</template>

<script>
import Empty from "@/components/Empty";
import { mapState } from "vuex";
export default {
  components: {
    Empty,
  },
  created() {
    this.$store.dispatch("about/fatchAbout");
  },
  computed: {
    ...mapState("about", ["data", "loading"]),
  },
};
</script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.about-iframe {
  width: 100%;
  height: 100%;
}
</style>