import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars, faChevronDown, faChevronLeft, faChevronRight);

createApp(App)
  .use(i18n)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
