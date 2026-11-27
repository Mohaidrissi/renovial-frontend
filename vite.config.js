import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Le front appelle l'API sur sa propre adresse ; Vite transmet au back (localhost:8081).
// Comme ça, un seul lien (tunnel) suffit pour montrer le site complet.
const versBack = {
  target: 'http://localhost:8081',
  // le navigateur ne fait plus de requête cross-origin : pas besoin que le back accepte l'adresse du tunnel
  configure: (proxy) => proxy.on('proxyReq', (req) => req.removeHeader('origin')),
  // /register est aussi une page React : on laisse Vite servir la page quand le navigateur demande du HTML
  bypass: (req) => (req.headers.accept?.includes('text/html') ? req.url : undefined),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': versBack, '/authenticate': versBack, '/register': versBack },
  },
})
