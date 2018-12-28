import Vue from "vue";
import App from "./App.vue";

import hMagnifyingGlass from './magnifyingGlass'

Vue.use(hMagnifyingGlass)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
