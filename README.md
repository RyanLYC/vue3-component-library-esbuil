# Esbuild + Typescript + Vue3.0 组件库模板

## 功能介绍

- typescript
- esbuild 打包编译
- eslint 代码规范检查
- sass，postcss 预处理
- browserSync 本地开发服务

安装依赖

```
yarn
```

本地开发

```
yarn dev
```

生产打包

```
npm run build
# or
yarn build
```

## 目录结构

```
...
packages --------------- 组件库源码
 - components ---------- 组件目录
  - Button ------------- 组件目录
   - index.ts ---------- 组件注册入口
   - src --------------- 组件源码
 - index.ts ----------- 组件库打包入口文件
examples -------------- 开发预览页面源码
 - main.ts ------------ 预览页入口文件
 - App.vue ------------ 预览页入口组件
types ----------------- ts注解文件目录
.editorconfig --------- 编辑器配置文件
.eslintignore --------- eslint检查忽略目录
.eslintrc ------------- eslint检查配置文件
esbuild.config.js ------ esbuild配置文件
tsconfig.json --------- ts编译配置文件
components.js --------- 单组件映射表
...
```
