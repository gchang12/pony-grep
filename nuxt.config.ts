// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@nuxt/scripts"],
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  head: {
    script: [
     /*
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-9GH7X9N0XK",
        async: true,
      },
     */
      {
        src: "./scripts/gtag.js",
      },
    ],
    meta: [
      {
        "name": "description",
        "content": "A tool for searching and browsing through all MLP G4 transcripts, including EQG.",
      },
      {
        "property": "og:url",
        "content": "https://earnest-toffee-ecd594.netlify.app/",
      },
      {
        "property": "og:type",
        "content": "website",
      },
      {
        "property": "og:title",
        "content": "Pony Grep!",
      },
      {
        "property": "og:description",
        "content": "A tool for searching and browsing through all MLP G4 transcripts, including EQG.",
      },
      {
        "property": "og:image",
        "content": "https://earnest-toffee-ecd594.netlify.app/favicon.ico",
      },
    ],
  },
  scripts: {
    registry: {
      googleAnalytics: {
        id: "9GH7X9N0XK",
        trigger: 'onNuxtReady',
      },
    },
  },
})