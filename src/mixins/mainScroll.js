export default function (refValue) {
  return {
    methods: {
      //处理Scroll事件
      handleScroll() {
        this.$bus.$emit("mainScroll", this.$refs[refValue]);
      },
      //处理setMainScroll事件
      handleSetMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop;
      },
    },
    mounted() {
      this.$bus.$on("setMainScroll", this.handleSetMainScroll);
      this.$refs[refValue].addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      this.$bus.$emit("mainScroll");
      this.$bus.$off("setMainScroll", this.handleSetMainScroll);
      this.$refs[refValue].removeEventListener("scroll", this.handleScroll);
    },
  };
}
