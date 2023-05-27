import { defineConfig } from 'vite'
export default defineConfig({
  resolve: {
    alias: {
      vue: 'reactivue',
      'vue-demi': 'reactivue',
      '@vue/runtime-dom': 'reactivue',
    },
  },
  optimizeDeps: {
    exclude: [
      'dayjs',
      'reactivue',
      'react-mapbox-gl',
    ],
  },
})
