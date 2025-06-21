import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

// Pinia Config
import { createPinia } from "pinia";

// Emitter Config
import emitter from "./EmitterBus";

// Swiper Config
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const app = createApp(App);

app.config.globalProperties.$emitter = emitter;
app.use(createPinia()).use(vuetify).use(router).mount("#app");
