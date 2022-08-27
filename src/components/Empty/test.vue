<template>
  <div class="test-container">
    <Empty />
  </div>
</template>
<script>
import Empty from "@/components/Empty";
export default {
  name: "Test",
  components: {
    Empty,
  },
};
</script>
<style scoped>
.test-container {
  width: 500px;
  height: 500px;
  border: 2px solid black;
  position: relative;
}
</style>