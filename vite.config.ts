import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  //server: {
   // proxy: {
    //  '/api': {
     //   target: 'https://altudocommerceorchestrator-hje4cvh5bgadhseq.centralindia-01.azurewebsites.net',
     //   changeOrigin: true,
      //  secure: true,
      //  rewrite: (path) => path.replace(/^\/api/, '/api'),
     // },
    //},
  //},
});
