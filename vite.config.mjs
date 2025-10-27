import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_PORT ?? '3000')
  return {
    plugins: [react()],
    build: {
      outDir: 'build',
    },
    server: {
      port: port
    },
  }
});
