const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = () => {
  return {
    entry: './src/entry.js',
    output: {
      path: path.join(__dirname, '../dist'),
      filename: './entry.js'
    },
    devtool: false,
    watchOptions: {
      ignored: /node_modules/
    },
    devServer: {
      port: 8080,
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      watchFiles: [
        `src/**/*.tsx`,
        'src/css/**/*.scss',
      ],
      hot: true
    },
    cache: true,
    target: ["web", "es2019"],
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          root: JSON.stringify(process.env.root),
        }
      }),
    ],
    stats: {
      preset: 'minimal'
    }
  };
};