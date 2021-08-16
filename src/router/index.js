import { createRouter, createWebHistory, RouterView } from "vue-router";
import i18n from "../i18n";

const routes = [
  {
    path: "/:lang",
    component: RouterView,
    beforeEnter: (to, from, next) => {
      const locale = to.params.lang;
      const supported_locales =
        process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(",");
      if (!supported_locales.includes(locale)) return next("en");
      if (i18n.locale !== locale) {
        i18n.locale = locale;
      }
      return next();
    },
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "contact" */ "../views/Home.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () =>
          import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect() {
      return process.env.VUE_APP_I18N_LOCALE;
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
