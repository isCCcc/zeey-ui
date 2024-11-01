import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'/',
  build:{
    lib:{
      entry: path.resolve(__dirname, './packages/index.ts'), //指定组件编译入口文件
      name: 'vueZeeyUI',
      fileName: 'vue-zeey-ui'
    },//库编译模式配置
    rollupOptions: {
      external: ['vue', 'swiper', '@vuepic/vue-datepicker', 'qrcode'],
      output: {
        // format: 'es', // 默认es，可选 'amd' 'cjs' 'es' 'iife' 'umd' 'system'
        exports: 'named',
        globals: { //在UMD构建模式下为这些外部化的依赖提供一个全局变量
          vue:'Vue',
          // 'vue-router': 'VueRouter', // 引入vue-router全局变量，否则router.push将无法使用
          swiper: 'Swiper',
          '@vuepic/vue-datepicker': 'VueDatePicker',
          qrcode: 'qrcode'
        }
      }
    },
     /** 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。
        默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
        注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。
        当设置为 'terser' 时必须先安装 Terser。（yarn add terser -D）
    */
    minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: { // 在打包代码时移除 console、debugger 和 注释
      compress: {
        /* (default: false) -- Pass true to discard calls to console.* functions.
          If you wish to drop a specific function call such as console.info and/or
          retain side effects from function arguments after dropping the function
          call then use pure_funcs instead
        */
        drop_console: true, // 生产环境时移除console
        drop_debugger: true
      },
      format: {
        comments: false // 删除注释comments
      }
    }
  }
})

