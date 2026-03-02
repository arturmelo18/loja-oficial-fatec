// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@element-plus/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "nuxt-mongoose",
    "@nuxt/ui",
  ],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",
  eslint: {
    config: {
      stylistic: true,
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    modelsDir: "models",
  },
});
