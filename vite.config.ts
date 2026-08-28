import { defineConfig } from 'vite';

export default defineConfig({
  root: 'site',
  build: {
    outDir: '../dist/site', emptyOutDir: true, target: 'es2022',
    rollupOptions: { input: { index: 'index.html', demo: 'demo.html', privacy: 'privacy.html', terms: 'terms.html' } }
  }
});
