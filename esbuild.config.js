/* eslint-disable quotes */
import { build, context } from 'esbuild'
import vue from 'esbuild-plugin-vue3'
import progress from 'esbuild-plugin-progress'
import { esbuildPluginFileSize } from 'esbuild-plugin-filesize'
import esbuildStylePlugin from 'esbuild-style-plugin'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'
import postcssMinify from 'postcss-minify'
import esbuildPluginBowserSync from 'esbuild-plugin-browser-sync'
import { htmlPlugin } from 'esbuild-html-plugin'
import components from './components.js'
// 包名
const libraryName = 'zg-ui'
const globalName = 'ZgUI'

// 打包组件库
async function buildLibrary() {
  await build({
    entryPoints: ['packages/index.ts'],
    outfile: `lib/${libraryName}.js`,
    bundle: true,
    format: 'esm',
    tsconfig: 'tsconfig.json',
    treeShaking: true,
    external: ['vue'],
    assetNames: '[dir]/[name]-[hash]',
    loader: {
      '.eot': 'file',
      '.svg': 'file',
      '.ttf': 'file',
      '.woff': 'file'
    },
    define: {
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    },
    plugins: [
      esbuildStylePlugin({
        postcss: {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ['last 10 version']
            }),
            postcssImport(),
            postcssPresetEnv(),
            postcssMinify()
          ]
        }
      }),
      vue(),
      progress(),
      esbuildPluginFileSize()
    ]
  })

  await build({
    entryPoints: ['packages/index.ts'],
    outfile: `lib/${libraryName}.min.js`,
    bundle: true,
    format: 'iife',
    tsconfig: 'tsconfig.json',
    globalName,
    treeShaking: true,
    minify: true,
    external: ['vue'],
    define: {
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    },
    loader: {
      '.eot': 'dataurl',
      '.svg': 'dataurl',
      '.ttf': 'dataurl',
      '.woff': 'dataurl'
    },
    plugins: [
      esbuildStylePlugin({
        postcss: {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ['last 10 version']
            }),
            postcssImport(),
            postcssPresetEnv(),
            postcssMinify()
          ]
        }
      }),
      vue(),
      progress(),
      esbuildPluginFileSize()
    ]
  })

  await build({
    entryPoints: Object.values(components),
    outdir: 'lib',
    bundle: true,
    format: 'esm',
    tsconfig: 'tsconfig.json',
    treeShaking: true,
    external: ['vue'],
    assetNames: '[dir]/[name]',
    loader: {
      '.eot': 'dataurl',
      '.svg': 'dataurl',
      '.ttf': 'dataurl',
      '.woff': 'dataurl'
    },
    mainFields: ['module'],
    define: {
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    },
    plugins: [
      esbuildStylePlugin({
        postcss: {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ['last 10 version']
            }),
            postcssImport(),
            postcssPresetEnv(),
            postcssMinify()
          ]
        }
      }),
      vue(),
      progress()
    ]
  })
}

// 打包预览页面
async function buildExamples() {
  const ctx = await context({
    entryPoints: ['examples/main.ts'],
    outdir: 'dist/static',
    bundle: true,
    tsconfig: 'tsconfig.json',
    format: 'iife',
    sourcemap: true,
    loader: {
      '.eot': 'file',
      '.svg': 'file',
      '.ttf': 'file',
      '.woff': 'file'
    },
    define: {
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    },
    plugins: [
      esbuildStylePlugin({
        postcss: {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ['last 10 version']
            }),
            postcssImport(),
            postcssPresetEnv(),
            postcssMinify()
          ]
        }
      }),
      vue(),
      progress(),
      htmlPlugin({
        outfile: `index.html`,
        createHeadElements: () => [
          `<meta charset="UTF-8" />`,
          `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`,
          `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
          `<link rel="stylesheet" href="./main.css" />`,
          `<title>zg-ui</title>`
        ],
        language: 'en',
        createBodyElements: (outputUrls) => {
          const bodyArray = ['<div id="app"></div>']
          outputUrls
            .filter((outputUrl) => outputUrl.endsWith(`.js`))
            .forEach((outputUrl) => {
              bodyArray.push(`<script src="${outputUrl}"></script>`)
            })
          return bodyArray
        }
      }),
      esbuildPluginBowserSync({
        server: 'dist/static'
      })
    ]
  })
  await ctx.watch()
}

// 启动函数
async function start() {
  if (process.argv.includes('serve')) {
    buildExamples()
  } else {
    buildLibrary()
  }
}

start()
