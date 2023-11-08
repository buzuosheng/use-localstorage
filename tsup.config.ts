import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/use-localstorage.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  dts: true,
  splitting: true,
  clean: true
})