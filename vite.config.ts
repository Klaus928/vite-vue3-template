import { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'
import { wrapperEnv, getFileName } from './build/utils'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
function pathResolve(dir: string) {
  console.log('reslove', resolve)
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/ 情景配置
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/'
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/'
        }
        // ['@vue/compiler-sfc', '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js'],
      ]
    },
    server: {
      cors: true,
      proxy: {
        '/api': {
          // target: '',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE
        }
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      assetsDir: 'static',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].js',
          entryFileNames: `static/js/[name].js`,
          assetFileNames: ({ name }) => {
            const filename = getFileName(name)
            if (filename === 'logo') {
              return '[name].[ext]'
            } else {
              return 'static/[name]-[hash][extname]'
            }
          }
        }
      }
    },
    plugins: [
      vue(),
      eslintPlugin(),
      tsconfigPaths(),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: true, // enabled by default if `typescript` is installed
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
      })
    ]
  }
}
