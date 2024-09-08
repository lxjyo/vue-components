import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import clear from 'rollup-plugin-clear'

const input = './components/index.ts'

const plugins = [
  nodeResolve(),
  vue({
    preprocessStyles: true
  }),
  typescript({
    tsconfig: 'tsconfig.app.json',
    include: ['components/**/*.ts', 'components/**/*.tsx'],
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: './dist'
      }
    }
  }),
  babel({
    presets: ['@babel/preset-env'],
    extensions: ['.ts', '.js'],
    exclude: ['node_modules/**'],
    babelHelpers: 'bundled'
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
        preserveModules: true
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
      name: 'VueAntdComps',
      exports: 'named',
      globals: {
        vue: 'Vue',
        'ant-design-vue': 'Antd',
      }
    },
    external: ['vue', 'ant-design-vue']
  }
])
