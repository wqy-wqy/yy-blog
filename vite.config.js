// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [vue()],
//     server: {
//         host: '0.0.0.0',
//         port: 3000,
//         proxy: {
//             '/api': {
//                 target: 'http://1.15.245.33:8888', //实际请求地址
//                 changeOrigin: true,
//                 rewrite: (path) => path.replace(/^\/api/, '')
//             },
//         }
//     }
// })