import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages expects an index.html in the root directory
  // so just run npm build before pushing to GitHub and this will rebuild our assets to the root
  build: {
    outDir: '..',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        saved: resolve(__dirname, 'saved/index.html'),
        "show-info": resolve(__dirname, 'show-info/index.html'),
      },
    }, 
  },
  // needed for github pages just put the repo name here
  base: '/Binge-Finder/', 
});
