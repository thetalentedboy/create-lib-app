import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import alias from '@rollup/plugin-alias';
import pkg from './package.json' assert { type: 'json' }; //断言导出json模块
import json from '@rollup/plugin-json';

import path, { dirname } from 'path';
import { rimrafSync } from 'rimraf';
import { fileURLToPath } from 'url';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import strip from '@rollup/plugin-strip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
rimrafSync('dist'); // 删除打包目录

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig([
    {
        input: 'src/index.ts', //入口文件
        output: [
            {
                file: pkg.module, //出口文件
                format: 'es', //打包成es module模块
            },
            {
                file: pkg.commonjs,
                format: 'commonjs',
            },
            {
                name: 'sdk', //打包成UMD模式，需提供name
                file: pkg.browser, //出口文件
                format: 'umd', //打包成UMD模块,
            },
            // 提供 vitePress 使用
            {
                file: 'docs/.vitepress/sdk.es.js',
                format: 'es',
            },
        ],
        plugins: [
            json(),
            resolve({
                extensions: ['.tsx', '.ts', '.js'],
            }),
            typescript({
                tsconfig: 'tsconfig.json',
                useTsconfigDeclarationDir: true,
                clean: true,
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true,
                        declarationDir: 'dist/types',
                    },
                },
            }),
            terser(),
            commonjs(),
            alias({
                entries: [
                    {
                        find: '@',
                        replacement: path.resolve(__dirname, 'src'),
                    },
                ],
            }),
            babel({
                babelHelpers: 'runtime',
                extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
            }),
            postcss({
                extensions: ['.scss', '.css'],
                plugins: [autoprefixer(), cssnano()],
                use: ['sass'],
                extract: 'sdk.css',
            }),
            isProduction &&
                strip({
                    include: '**/*.(js|mjs|ts|tsx)', // 匹配需要处理的文件
                    exclude: 'node_modules/**', // 匹配不需要处理的文件
                    functions: ['console.*', 'debugger', 'debug', 'alert'], // 需要移除的函数
                    sourceMap: false,
                }),
            del({ targets: 'dist/*' }),
        ].filter(Boolean),
    },
]);
