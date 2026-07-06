import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'MotorIQ Dashboard',
        short_name: 'MotorIQ',
        description: 'Advanced telemetry dashboard for ESP32 motor control',
        theme_color: '#0f172a',
        icons: [
          {
            src: '/motoriq-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/motoriq-logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
