import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";

import LARA from "@primeuix/themes/lara";

import InputSwitch from "primevue/inputswitch";

import "./style.css";

import { initTheme } from "./theme-manager.ts";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: LARA,
    options: {
      darkModeSelector: ".my-app-dark",
    },
  },
  ripple: true,
});

app.component("InputSwitch", InputSwitch);

app.use(router);

initTheme().then(() => {
  app.mount("#app");
});
