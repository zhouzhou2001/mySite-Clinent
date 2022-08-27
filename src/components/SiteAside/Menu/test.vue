<template>
  <div class="test-containr">
    <Menu />
  </div>
</template>
<script>
import Menu from "@/components/SiteAside/Menu";
export default {
  name: "Test",
  components: {
    Menu,
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