module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 80,
    proxy: 'http://10.10.102.23:8010',
    disableHostCheck: true
  }
}
