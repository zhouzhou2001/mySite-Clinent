import { getProject } from "@/api/project";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fatchProject(ctx) {
      if (ctx.state.data.length < 1) {
        ctx.commit("setLoading", true);
        const response = await getProject();
        ctx.commit("setData", response);
        ctx.commit("setLoading", false);
        // console.log(ctx.state.data);
      }
    },
  },
};
