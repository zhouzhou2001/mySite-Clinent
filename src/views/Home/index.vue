<template>
  <div
    class="home-container"
    ref="container"
    @wheel="handleWheel"
    v-loading="isLoading"
  >
    <ul class="carousel-container" :style="{ marginTop: marginTop }">
      <li v-for="item in data" :key="item.id">
        <Carouselitem :carousel="item" />
      </li>
    </ul>
    <div class="icon icon-up" v-show="index > 0" @click="index--">
      <Icon type="shangjiantou" />
    </div>
    <div
      class="icon icon-down"
      v-show="index < this.data.length - 1"
      @click="index++"
    >
      <Icon type="xiajiantou" />
    </div>
    <ul class="indicator">
      <li
        :class="{ active: i === index }"
        v-for="(item, i) in data"
        :key="item.id"
        @click="index = i"
      ></li>
    </ul>
  </div>
</template>

<script>
import Carouselitem from "./Carouselitem";
import Icon from "@/components/Icon";
import { mapState } from "vuex";

export default {
  components: {
    Carouselitem,
    Icon,
  },
  data() {
    return {
      index: 0,
      containerHeight: 0,
    };
  },
  created() {
    this.$store.dispatch("banner/fatchBanners");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["data", "isLoading"]),
  },
  methods: {
    /**
     * 滚动翻页
     * e 事件对象
     */
    handleWheel(e) {
      if (e.deltaY < 0 && this.index > 0) {
        this.index--;
      } else if (e.deltaY > 0 && this.index < this.data.length - 1) {
        this.index++;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@gap: 20px;
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  // background: #000;
  overflow: hidden;

  //测试
  // width: 600px;
  // height: 400px;
  // top: 100px;
  // left: 100px;
  // border: 2px solid red;
  // overflow: visible;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
    transition: 1s;
  }
}
.carousel-container {
  width: 100%;
  height: 100%;
  li {
    width: 100%;
    height: 100%;
  }
}
.icon {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;

  &.icon-up {
    top: @gap;
    animation: run-up 2s infinite;
  }
  &.icon-down {
    bottom: @gap;
    animation: run-down 2s infinite;
  }
  .icon-container {
    font-size: 30px;
  }
  color: @gray;
  @run: 10px;
  @keyframes run-up {
    0% {
      transform: translate(-50%, @run);
    }
    50% {
      transform: translate(-50%, -@run);
    }
    100% {
      transform: translate(-50%, @run);
    }
  }
  @keyframes run-down {
    0% {
      transform: translate(-50%, -@run);
    }
    50% {
      transform: translate(-50%, @run);
    }
    100% {
      transform: translate(-50%, -@run);
    }
  }
}
.indicator {
  position: absolute;
  top: 50%;
  right: @gap;
  transform: translate(0, -50%);
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    margin: 10px;
    border: 2px solid #fff;
    box-sizing: border-box;
    transition: 0.5;
    &.active {
      background-color: #000;
    }
  }
}
</style>