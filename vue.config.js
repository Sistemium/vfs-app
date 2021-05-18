const STMManifestPlugin = require('./manifest-plugin');


const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new STMManifestPlugin({
    fileName: 'app.manifest',
  }));
}

module.exports = {
  transpileDependencies: [
    'vue2-google-maps',
    'sistemium-vue',
    'sistemium-debug',
    'sistemium-dates',
  ],
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
        target: 'https://vfs.sistemium.com/dapi',
        // target: 'http://localhost:9390',
        changeOrigin: true,
        pathRewrite: {
          // '^/api/vfs': '/api', // uncomment for localhost api
          '^/api/vfs': '/', // uncomment for vfs.sistemium.com api
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
