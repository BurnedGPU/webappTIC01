import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Mi primera PWA',
                short_name: 'PWA',
                description: 'Ejemplo de PWA con React y Vite',
                theme_color: '#ffffff',
                background_color: "#ffffff",
                display: "standalone",
                start_url: ".",
                icons: [
                    {
                        src: "/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        })
    ],
    server: {
        proxy: {
            // Redirige todas las peticiones que empiecen con /api
            // al servidor backend que corre en el puerto 3001
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})

