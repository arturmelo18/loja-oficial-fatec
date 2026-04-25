// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://unicons.iconscout.com/release/v4.0.8/css/line.css' 
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap'
        }
      ]
    }
  },
  modules: ['@element-plus/nuxt', '@nuxt/eslint', 'nuxt-mongoose', '@nuxt/ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/fatecano.css'],
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    modelsDir: 'models',
  },
  runtimeConfig: {
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  }
})
