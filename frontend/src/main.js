import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import { createPinia } from "pinia";

// Kích hoạt Pinia
const pinia = createPinia();
const app = createApp(App).use(pinia).use(router).mount("#app");

export default app;
