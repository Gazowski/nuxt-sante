import { defineNuxtConfig } from 'nuxt/config';
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
  ],
  primevue: {
    autoimport: true,
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  css: [
    // 'primevue/resources/themes/lara-light-indigo/theme.css', // Choisissez votre thème PrimeVue
    // 'primevue/resources/primevue.min.css',
    // 'primeicons/primeicons.css',
    // '~/assets/css/main.css' // css global
  ],
  build: {
    transpile: ['primevue']
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables.scss";',
        },
      },
    },
  },
})