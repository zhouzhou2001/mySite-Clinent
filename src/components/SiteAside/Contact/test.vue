<template>
  <div class="test-containr">
    <Contact />
  </div>
</template>
<script>
import Contact from "@/components/SiteAside/Contact";
import "@/styles/global.less";

export default {
  name: "Test",
  components: {
    Contact,
  },
};
</script>
<style lang="less" scoped>
.test-containr {
  width: 300px;
  height: 600px;
  border: 2px solid red;
  background-color: black;
}
</style>