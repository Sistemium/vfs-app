const STMManifestPlugin = require('./manifest-plugin');


const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new STMManifestPlugin({
    fileName: 'app.manifest',
  }));
}

module.exports = {
  publicPath: '',
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
  configureWebpack: {
    plugins,
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
