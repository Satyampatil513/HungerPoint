// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: process.env.PORT || 3000,
    host: true, // This will expose the server to the network
  },
  preview: {
    port: process.env.PORT || 3000,
    host: true, // This will expose the server to the network
  },
});