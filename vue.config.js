const { defineConfig } = require('@vue/cli-service');
const STMManifestPlugin = require('./manifest-plugin');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new STMManifestPlugin({
    fileName: 'app.manifest',
  }));
}

module.exports = defineConfig({
  transpileDependencies: [
    'vue2-google-maps',
    'sistemium-debug',
    'sistemium-dates',
  ],
  publicPath: '',
  pluginOptions: {
    // i18n: {
    //   locale: 'lt',
    //   fallbackLocale: 'en',
    //   localeDir: 'locales',
    //   enableInSFC: true,
    //   enableBridge: false,
    // },
  },
  configureWebpack: {
    plugins,
  },
  devServer: {
    // port: 8890,
    allowedHosts: 'all',
    proxy: {
      '/api': {
        target: 'https://vfs.sistemium.com/dapi',
        // target: 'http://localhost:9390',
        changeOrigin: true,
        pathRewrite: {
          // '^/api/vfs': '/api', // uncomment for localhost api
          '^/api': '/', // uncomment for vfs.sistemium.com api
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
});
