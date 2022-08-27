import Vue from "vue";
import { Store, install } from "vuex";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";

if (!window.Vuex) {
  install(Vue);
}

export default new Store({
  strict: true,
  modules: { banner, setting, about, project },
});
