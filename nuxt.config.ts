import { defineNuxtConfig } from 'nuxt/config';
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'suivi santé',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/google-fonts',
    'nuxt-emoji-picker',
    '@nuxtjs/tailwindcss',
  ],

  primevue: {
    options: {
      theme: 'none'
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  css: [
    'primeicons/primeicons.css',
    '@/assets/tailwind.css' // css global
  ],
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

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

  devServer: {
    port: 3010,
  },

  googleFonts: {
    families: {
      'Josefin+Slab': true,
      'Comfortaa': true,
    },
    display: 'swap',
  },

  experimental: {
    renderJsonPayloads: true,
  },

  compatibilityDate: '2024-12-26',
})