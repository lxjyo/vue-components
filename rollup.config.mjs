import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import clear from 'rollup-plugin-clear'
// 替换
import replace from '@rollup/plugin-replace'

const input = './src/components/index.ts'

const plugins = [
  nodeResolve(),
  vue({
    preprocessStyles: true
  }),
  typescript({
    tsconfig: 'tsconfig.app.json',
    // useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      include: ['shim-vue.d.ts', 'src/components/**/*.ts', 'src/components/**/*.vue'],
      compilerOptions: {
        declaration: true,
        rootDir: './src/components'
        // declarationDir: './dist/types'
      }
    }
  }),
  babel({
    presets: ['@babel/preset-env'],
    extensions: ['.ts', '.js'],
    exclude: ['node_modules/**'],
    babelHelpers: 'bundled'
  }),
  replace({
    // 需要将字符串做一下替换，不然会报错：process is not defined
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  postcss({
    minimize: true,
    extract: true,
    extensions: ['.css', '.less']
  }),
  clear({
    targets: ['dist']
  })
]

export default defineConfig([
  {
    input,
    plugins,
    output: [
      {
        dir: './dist/esm',
        format: 'esm',
        preserveModules: true
      },
      {
        dir: './dist/cjs',
        format: 'cjs',
        preserveModules: true,
        exports: 'named'
      }
    ],
    external: ['vue', 'ant-design-vue', '@ant-design/icons-vue']
  },
  {
    input,
    plugins,
    output: {
      dir: './dist/umd',
      format: 'umd',
      name: 'AntdComponents',
      exports: 'named',
      globals: {
        vue: 'Vue',
        'ant-design-vue': 'antd'
      }
    },
    external: ['vue', 'ant-design-vue']
  }
])
