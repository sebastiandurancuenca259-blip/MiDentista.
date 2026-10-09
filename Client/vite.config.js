import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        servicios: resolve(import.meta.dirname, 'servicios.html'),
        contacto: resolve(import.meta.dirname, 'contacto.html'),
        agendar: resolve(import.meta.dirname, 'agendar.html'),
        admin: resolve(import.meta.dirname, 'admin.html'),
        privacidad: resolve(import.meta.dirname, 'privacidad.html'),
        notfound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
