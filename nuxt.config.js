import { fileURLToPath } from "node:url";

import ROUTES from "./app/constants/routes";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/google-fonts", "@vueuse/nuxt"],

  css: ["~/assets/css/main.scss", "~/assets/css/reset.css", "~/assets/css/global.css"],

  runtimeConfig: {
    public: {
      siteUrl: "",
    },
  },

  routeRules: {
    [ROUTES.ROOT]: { prerender: true },
  },

  googleFonts: {
    families: {
      Inter: [400, 500],
      "IBM Plex Mono": [400],
    },
    display: "swap",
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/grid.scss" as *;',
          loadPaths: [fileURLToPath(new URL("./app", import.meta.url))],
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
    },
  },
});
