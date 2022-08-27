export default function (defaultDataValues = null) {
  return {
    data() {
      return {
        data: defaultDataValues,
        isLoading: true,
      };
    },
    async created() {
      this.data = await this.fatchData();
      this.isLoading = false;
    },
  };
}
