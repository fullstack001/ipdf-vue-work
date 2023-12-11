module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": require("path").resolve(__dirname, "src"),
        "@pages": require("path").resolve(__dirname, "src/pages"),
        "@components": require("path").resolve(__dirname, "src/components"),
        "@langSelector": require("path").resolve(
          __dirname,
          "src/components/LangSelector"
        ),
        "@languages": require("path").resolve(__dirname, "src/assets/lang"),
      },
    },
  },
};
