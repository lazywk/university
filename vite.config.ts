import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import { sassPlugin } from 'esbuild-sass-plugin';

export default defineConfig({
  plugins: [svgr(), react()],
  optimizeDeps: {
    extensions: ['.css'],
    esbuildOptions: {
      plugins: [
        sassPlugin({ type: 'style' }) as any,
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 3001,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  define: {
    'process.env': {}
  }
});
