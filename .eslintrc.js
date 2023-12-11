module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    // // eslint-disable-next-line
    // "vue/multi-word-component-names": [
    //   "error",
    //   {
    //     ignores: [],
    //   },
    // ],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
