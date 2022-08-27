import { getSetting } from "@/api/setting";
import { titleController } from "@/utils";

export default {
  namespaced: true,
  state: {
    data: null,
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
    async fatchSetting(ctx) {
      ctx.commit("setLoading", true);
      const response = await getSetting();
      ctx.commit("setData", response);
      ctx.commit("setLoading", false);
      if (response.favicon) {
        let link = document.querySelector("link[rel='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          link.href = response.favicon;
          link.type = "image/png";
          document.querySelector("head").appendChild(link);
        }
        if (response.siteTitle) {
          titleController.setSiteTitle(response.siteTitle);
        }
      }
    },
  },
};
