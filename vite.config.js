import { resolve } from 'path'

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    base: 'https://ivanveliz.github.io/TabataTimer'
  },
  server: {
    port: 8080
  }
}
