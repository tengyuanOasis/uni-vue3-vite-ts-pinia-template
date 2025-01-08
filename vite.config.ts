import path from "path";
import uni from '@dcloudio/vite-plugin-uni';
import AutoImportTypes from 'auto-import-types';
import PiniaAutoRefs from 'pinia-auto-refs';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import env from './src/config/env';
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from "weapp-tailwindcss/vite";
// start 引入tailwindcss增加的配置0

// 注意： 打包成 h5 和 app 都不需要开启插件配置
const isH5 = process.env.UNI_PLATFORM === 'h5';
const isApp = process.env.UNI_PLATFORM === 'app';
const WeappTailwindcssDisabled = isH5 || isApp;

const resolve = (p) => {
  return path.resolve(__dirname, p);
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    AutoImportTypes(),
    PiniaAutoRefs(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          '@/helper/pinia-auto-refs': ['useStore']
        }
      ],
      exclude: ['createApp'],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts'
    }),
    uni(),
    Unocss(),
	  uvwt({
			rem2rpx: true,
			disabled: WeappTailwindcssDisabled,
			// 由于 hbuilderx 会改变 process.cwd 所以这里必须传入当前目录的绝对路径
			tailwindcssBasedir: __dirname
	  })
  ],
  css: {
	  postcss: {
			plugins: [
				require("tailwindcss")({
					// 注意此处，手动传入你 `tailwind.config.js` 的绝对路径
					config: resolve("./tailwind.config.js")
				}),
				require("autoprefixer")
			],
	  },
	},
  server: {
    open: true, // 自动打开
    base: './ ', // 生产环境路径
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: env.apiBaseUrl, // 后端服务实际地址
        changeOrigin: true, // 开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
