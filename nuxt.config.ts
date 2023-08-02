// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@formkit/nuxt',
    '@vueuse/nuxt',
  ],
  piniaPersistedstate: {
    storage: "localStorage"
  },
  devtools: { enabled: true },
  ssr: false,
})
