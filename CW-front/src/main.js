import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; //routerдля Vue Router (реализовано позже в src / router.js ) 
import store from "./store"; //store для Vuex (реализовано позже в src / store )
import "bootstrap"; //bootstrapс помощью CSS 
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome' //vue-fontawesome для значков (используется позже в nav)

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

