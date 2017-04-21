module.exports = {
  entry: "./src/index.ts",
  output: {
    library: 'udApi',
    libraryTarget: 'commonjs',
    filename: 'bundle.js',
    path: __dirname
  },
  externals: {
    "lodash": true,
    "axios": true,
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    loaders: [
      {
        test: /.ts$/,
        loader: 'awesome-typescript-loader',
      }
    ]
  }
};
