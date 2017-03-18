module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    loaders: [
      { test: /.ts$/, loader: 'awesome-typescript-loader' }
    ]
  }
};
