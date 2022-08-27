<template>
  <div class="test-container">
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        { name: "第一个", isSelect: false },
        { name: "第二个", isSelect: false },
        {
          name: "c",
          isSelect: true,
          children: [
            { name: "c-1", isSelect: false },
            { name: "c-2", isSelect: false },
            {
              name: "c-3",
              isSelect: false,
              children: [
                { name: "c-3-1", isSelect: false },
                { name: "c-3-2", isSelect: false },
                { name: "c-3-3", isSelect: false },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="less" scoped>
.test-container {
  width: 250px;
  height: 600px;
  border: 2px solid red;
}
</style>