module.exports = {
  // module: {
  //   rules: [
  //     {
  //       test: /\.(jpe?g|png|webp)$/i,
  //       use: [
  //         {
  //           loader: "responsive-loader",
  //           options: {
  //             adapter: require("responsive-loader/sharp")
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }
  chainWebpack: config => {
    const images = config.module.rule("images");

    // // clear all existing loaders.
    // // if you don't do this, the loader below will be appended to
    // // existing loaders of the rule.
    images.uses.clear();

    config.module
      .rule("images")
      .use("responsive-loader")
      .loader("responsive-loader")
      .tap(() => {
        return {
          adapter: require("responsive-loader/sharp")
        };
      });
  }
};
