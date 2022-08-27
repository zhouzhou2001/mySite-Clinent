<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" :style="imagePosition" ref="image">
      <ImageLoader
        @load="showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="info" ref="info">
      <div class="title" ref="title">{{ carousel.title }}</div>
      <div class="description" ref="description">
        {{ carousel.description }}
      </div>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descriptionWidth: 0,
      containerSize: null,
      imageSize: null,
      mouseX: 0,
      mouseY: 0,
    };
  },
  computed: {
    imagePosition() {
      if (!this.containerSize || !this.imageSize) {
        return;
      }
      const extraWidth = this.imageSize.width - this.containerSize.width;
      const extraHeight = this.imageSize.height - this.containerSize.height;
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descriptionWidth = this.$refs.description.clientWidth;

    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;

    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    //调用该方法显示文字
    showWords() {
      this.$refs.info.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.style.transition = "2s";
      this.$refs.title.clientWidth;
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.description.style.width = 0;
      this.$refs.description.style.transition = "2s 1s";
      this.$refs.description.clientWidth;
      this.$refs.description.style.width = this.descriptionWidth + "px";
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.imageSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  // background: @dark;
  position: relative;
  color: #fff;
  overflow: hidden;
}
.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;
  left: 0;
  top: 0;
  // z-index: -1;
  transition: 0.2s;
}
.info {
  position: absolute;
  top: 40%;
  left: 30px;
  color: #fff;
  opacity: 0;
}
.title {
  letter-spacing: 2px;
  font-size: 2em;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
}
.description {
  font-size: 1.2em;
  margin-top: 20px;
  overflow: hidden;
  white-space: nowrap;
  color: lighten(@gray, 20%);
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
}
</style>