import * as reactPlugin from 'vite-plugin-react'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  alias: {
    vue: 'reactivue',
    'vue-demi': 'reactivue',
    '@vue/runtime-dom': 'reactivue',
  },
  optimizeDeps: {
    exclude: [
      'dayjs',
      'reactivue',
      'react-mapbox-gl',
    ],
  },
}

export default config
