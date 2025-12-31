/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Testlerin içinde expect, test gibi fonksiyonları import etmeden kullanmak için
    globals: true, 
    // Testlerin tarayıcı (browser) ortamında çalışmasını simüle eder
    environment: 'jsdom',
    // Testlerden önce çalışacak kurulum dosyası 
    setupFiles: './src/__Testler__/setup.js', 
  },
});