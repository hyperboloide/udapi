webpack = require('webpack')
UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const target = 'udapi';

const banner = new webpack.BannerPlugin(`Usine Data API client.
Copyright © 2015-${new Date().getUTCFullYear()} Hyperboloide. All rights reserved.`);

const externals = {
  "lodash": {
    commonjs: "lodash",
    amd: "lodash",
    root: "_"
  }
},

minfiedEs5 = {
  entry: "./src/index.ts",
  output: {
    library: target,
    libraryTarget: 'umd',
    filename: target + '.min.js',
    path: `${__dirname}/build`
  },
  externals: externals,
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
  },
  plugins: [
    new UglifyJSPlugin({
      compress: true,
      mangle: true,
      sourceMap: true,
    }),
    banner,
  ]
};

normalEs5 = {
  entry: "./src/index.ts",
  output: {
    library: target,
    libraryTarget: 'umd',
    filename: target + '.js',
    path: `${__dirname}/build`
  },
  externals: externals,
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
  },
  plugins: [banner]
};

module.exports =  [normalEs5, minfiedEs5]
