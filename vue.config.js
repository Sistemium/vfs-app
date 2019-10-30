module.exports = {
  pwa: {
    workboxOptions: { skipWaiting: true },
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://vfs.sistemium.com/api',
        target: 'http://localhost:9390',
        changeOrigin: true,
        pathRewrite: {
          '^/api/vfs': '/api',
        },
      },
      '/ims': {
        target: 'https://api.sistemium.com/ims',
        changeOrigin: true,
        pathRewrite: {
          '^/ims': '',
        },
      },
    },
  },
};
