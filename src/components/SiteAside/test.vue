<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "@/components/SiteAside";
import "@/styles/global.less";

export default {
  name: "Test",
  components: {
    SiteAside,
  },
};
</script>

<style lang="less" scoped>
.test-container {
  width: 300px;
  height: 900px;
  border: 3px solid red;
  background-color: #000;
}
</style>