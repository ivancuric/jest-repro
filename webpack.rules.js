// const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = [
  // Disabled due to the following issue
  // https://github.com/electron-userland/electron-forge/issues/1688

  // {
  //   test: /\.node$/,
  //   use: 'node-loader',
  // },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: [
      // Disabled due to the following issue
      // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/263

      // isDevelopment && {
      //   loader: 'babel-loader',
      //   options: { plugins: ['react-refresh/babel'] },
      // },
      {
        loader: 'babel-loader',
        options: {
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
    ].filter(Boolean),
  },
];
