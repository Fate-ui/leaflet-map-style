/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import { createVitePlugins } from './config/vitePlugin'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    //单元测试
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'types'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  esbuild: {
    pure: ['console.log'], // 删除 console.log
  },
  plugins: createVitePlugins(),
  server: {
    host: '0.0.0.0',
    hmr: true,
    port: 9527,
    open: false,
    proxy: {
      '/api/v1': {
        // target: 'http://10.10.10.123:8874', // 内网
        // target: 'https://aba-data.vankeytech.com:9902/', // 测试环境
        target: 'http://192.168.0.47:8080', // 谢梁本地
        changeOrigin: true,
      },
    },
  },
})
