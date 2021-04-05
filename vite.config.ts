
import { resolve } from 'path'
import graphqlPlugin from 'vite-plugin-graphql'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const pwaConfig = {
  manifest: {
    "theme_color": "#f69435",
    "background_color": "#f69435",
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
  plugins: [vue(), VitePWA(pwaConfig), graphqlPlugin],
})

