import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";

import LARA from "@primeuix/themes/lara";

import InputSwitch from "primevue/inputswitch";
import DialogService from "primevue/dialogservice";
import DynamicDialog from "primevue/dynamicdialog";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

import { QueryClient } from "@tanstack/query-core";
import { VueQueryPlugin } from "@tanstack/vue-query";

import "./style.css";
import "primeicons/primeicons.css";

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

app.use(DialogService);

app.component("InputSwitch", InputSwitch);
app.component("DynamicDialog", DynamicDialog);
app.component("Button", Button);
app.component("Avatar", Avatar);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 2,
    },
  },
});
app.use(VueQueryPlugin, { queryClient });

app.use(router);

initTheme().then(() => {
  app.mount("#app");
});
