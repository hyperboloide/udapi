webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const banner = new webpack.BannerPlugin(`Usine Data api client library.
Copyright © 2015-${new Date().getUTCFullYear()} Hyperboloide. All rights reserved.`)

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
    library: 'udapi',
    libraryTarget: 'umd',
    filename: 'udapi.min.js',
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
    library: 'udapi',
    libraryTarget: 'umd',
    filename: 'udapi.js',
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
