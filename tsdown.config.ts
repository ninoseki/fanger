import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
  },
  {
    entry: ['src/bin/defang.ts', 'src/bin/refang.ts'],
    format: ['esm'],
    dts: false,
    outDir: 'dist/bin',
  },
])
