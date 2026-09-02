export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  modules: ["@nuxtjs/google-fonts", "@nuxt/image"],

  css: ["~/assets/css/main.scss", "~/assets/css/reset.css", "~/assets/css/global.scss"],

  runtimeConfig: {
    mailerApiUrl: "",
    mailerApiKey: "",
    mailerAddressBookId: "",

    public: {
      siteUrl: "",
    },
  },

  routeRules: {
    "/": { prerender: true },
  },

  googleFonts: {
    families: {
      Inter: [400, 500],
      "IBM Plex Mono": [400, 500],
    },
    display: "swap",
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/grid.scss" as *;',
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
    },
  },
});
