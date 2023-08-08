import ts from 'rollup-plugin-typescript2'
import path from 'path'
import dts from 'rollup-plugin-dts'
import resolve from 'rollup-plugin-node-resolve'

export default [{
  input: "./src/index.ts",
  output: [
    {
      file: path.resolve(__dirname, './dist/index.esm.js'),
      format: "es"
    },
    {
      file: path.resolve(__dirname, './dist/index.cjs.js'),
      format: "cjs"
    },
    {
      input: "./src/index.ts",
      file: path.resolve(__dirname, './dist/index.js'),
      format: "umd",
      name: "sfuClient"
    }
  ],
  plugins: [
    ts(),
    resolve(['.js', '.ts'])
  ]
}, {
  input: "./src/index.ts",
  output: {
    file: path.resolve(__dirname, './dist/index.d.ts'),
    format: "es",
  },
  plugins: [dts()]
}] 