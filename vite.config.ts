
import { resolve } from 'path'
import graphqlPlugin from 'vite-plugin-graphql'
import { VitePWA } from 'vite-plugin-pwa'
import styleImport from 'vite-plugin-style-import'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const pwaConfig = {
  manifest: {
    "theme_color": "#132968",
    "background_color": "#132968",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "name": "Game Shelf 2",
    "short_name": "GS",
    "description": "Virtual Game shelf of your physical games ",
    "icons": [
      {
        "src": "images/manifest-icon-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable any"
      },
      {
        "src": "images/manifest-icon-512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable any"
      },
      {
        "src": "images/manifest-icon-512.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "images/manifest-icon-512.png",
        "sizes": "384x384",
        "type": "image/png"
      },


    ]
  },
  workbox: {
    // workbox options for generateSW
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, './src') }
    ],
  },
  build: {
    chunkSizeWarningLimit: 600,
  },
  plugins: [vue(), VitePWA(pwaConfig), graphqlPlugin, styleImport({
    libs: [{
      libraryName: 'element-plus',
      esModule: true,
      ensureStyleFile: true,
      resolveStyle: (name) => {
        name = name.slice(3)
        return `element-plus/packages/theme-chalk/src/${name}.scss`;
      },
      resolveComponent: (name) => {
        return `element-plus/lib/${name}`;
      },
    }]
  })],
})

