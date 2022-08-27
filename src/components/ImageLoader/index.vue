<template>
  <div class="image-loader-container">
    <img class="placeholder" :src="placeholder" v-if="everythingDone" />
    <img
      class="origin"
      :src="src"
      @load="handleLoaded"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  name: "ImageLoader",
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      originLoaded: false, //原图是否加载完成
      everythingDone: true, //所有加载完成
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoaded() {
      this.originLoaded = true;
      setTimeout(() => (this.everythingDone = false), this.duration);
      this.$emit("load");
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";

.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>