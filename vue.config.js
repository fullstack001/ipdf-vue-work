module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/socket.io": {
        // target: "http://127.0.0.1:5000", // Your Socket.IO server address
        target: "https://api.pdfden.com", // Your Socket.IO server address
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};
