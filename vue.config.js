module.exports = {
  devServer: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://3.133.139.224:80',
        pathRewrite: { '^/api': ''},
        changeOrigin: true
      }
    }
  }
}