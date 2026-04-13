import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_PORT ?? '3000')
  return {
    plugins: [react()],
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) {
                return 'firebase';
              }
              if (id.includes('react')) {
                return 'react';
              }
              if (id.includes('mui')) {
                return 'mui';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      port: port
    },
  }
});
