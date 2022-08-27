<template>
  <Pager
    @pageChange="handlePageChange($event)"
    :total="total"
    :current="current"
  />
</template>

<script>
import Pager from "@/components/Pager";

export default {
  name: "Test",
  components: {
    Pager,
  },
  data() {
    return {
      total: 302,
      current: 1,
    };
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
    },
  },
};
</script>

<style>
</style>
