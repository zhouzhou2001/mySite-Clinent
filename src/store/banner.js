import { getBanners } from "@/api/banner";

export default {
  namespaced: true,
  state: {
    data: [],
    isLoading: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fatchBanners(ctx) {
      if (ctx.state.data.length < 1) {
        ctx.commit("setLoading", true);
        const response = await getBanners();
        ctx.commit("setData", response);
        ctx.commit("setLoading", false);
      }
    },
  },
};
