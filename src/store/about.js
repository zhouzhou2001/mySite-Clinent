import { getAbout } from "@/api/about";

export default {
  namespaced: true,
  state: {
    data: [],
    loading: false,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async fatchAbout(ctx) {
      if (ctx.state.data.length < 1) {
        ctx.commit("setLoading", true);
        const response = await getAbout();
        ctx.commit("setData", response);
        ctx.commit("setLoading", false);
      }
    },
  },
};
