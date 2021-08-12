import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import pkg from './package.json'

const { peerDependencies, version } = pkg
const external = Object.keys(peerDependencies)
const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default [
    {
        input: './src/index.ts',
        external,
        output: {
            file: 'dist/index.js',
            format: 'umd',
            name: 'Convoy',
            // sourcemap: true,
            globals: {
                // react: 'React',
                // 'react-dom': 'ReactDOM',
            },
        },
        plugins: [
              replace({
                'process.env.NODE_ENV': JSON.stringify('development'),
              }),
              resolve({
                extensions
              }),
              commonjs({
                include: 'node_modules/**',
              }),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false, // 输出时去除类型文件
                    },
                },
            }),
              babel({
                extensions,
                exclude: 'node_modules/**',
                babelHelpers: 'runtime',
              })
        ],
    },
    {
        input: './src/index.ts',
        external,
        output: [
            {
                name: 'Convoy',
                format: 'umd',
                file: pkg.unpkg,
                // sourcemap: true,
                globals: {
                    // react: 'React',
                    // 'react-dom': 'ReactDOM',
                },
            },
        ],
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            resolve({
                extensions
            }),
            commonjs({
                include: 'node_modules/**',
            }),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false, // 输出时去除类型文件
                    },
                },
            }),
            babel({
                extensions,
                exclude: 'node_modules/**',
                babelHelpers: 'runtime',
            }),
            terser(),
        ],
    },
]
