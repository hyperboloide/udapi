module.exports = {
  entry: "./src/index.ts",
  output: {
    library: 'udapi',
    libraryTarget: 'umd',
    filename: 'udapi.js',
    path: `${__dirname}/build`
  },
  externals: {
    "lodash": {
      commonjs: "lodash",
      amd: "lodash",
      root: "_"
    }
  },
  resolve: {
    extensions: ['.ts']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.ts$/,
        loader: 'awesome-typescript-loader',
      },
    ]
  }
};
