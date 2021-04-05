
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
        "src": "images/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "images/icon-256x256.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "images/icon-384x384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "images/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
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

