// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // carrega variáveis de .env (ex.: VITE_BACKEND_PORT)
  const env = loadEnv(mode, process.cwd(), ''); 
  const BACKEND_PORT = env.VITE_BACKEND_PORT || '3001';

  return {
    plugins: [react()],
    server: {
      // porta do Vite (dev server)
      port: 5174,

      // todas as chamadas para /api e /auth serão redirecionadas para o seu back
      proxy: {
        '/api': {
          target: `http://localhost:${BACKEND_PORT}`,
          changeOrigin: true,
          secure: false,
          // opcional: mantém o caminho /api no destino
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
        '/auth': {
          target: `http://localhost:${BACKEND_PORT}`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/auth/, '/auth'),
        },
      },
    },

    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: './src/main.jsx',
      },
    },
  };
});
