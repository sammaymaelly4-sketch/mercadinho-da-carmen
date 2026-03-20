import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mercadinho da Carmen',
        short_name: 'Mercadinho',
        description: 'Delivery de Bebidas e Mercado do Bairro',
        theme_color: '#2D5A3D',
        background_color: '#FAF6EE',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      }
    })
  ]
})
