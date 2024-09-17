const path = require('path');
const globule = require('globule');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const TerserPlugin = require("terser-webpack-plugin");

const scssEntriesFile = () => {
  /** grep scss files */
  const scssFiles = (() =>
    globule.find([`**/*.scss`, `!**/_*.scss`], {
      cwd: `${__dirname}/../src/css`
    })
  )();

  /** Create object containing entry files */
  const entriesList = scssFiles.reduce((temp, current) => {
    const fileName = current.replace(new RegExp(`.scss`, 'i'), '');
    temp[`${fileName}`] = `${__dirname}/../src/css/${fileName}.scss`;
    return temp;
  }, {});

  return entriesList;
};

module.exports = (env) => ({
  entry: scssEntriesFile(),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: `s/js/[name].js`,
    publicPath: '../dist',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].chunk.css',
    }),
    new RemoveEmptyScriptsPlugin(),
  ],
  optimization: {
    minimize: env.WEBPACK_BUILD,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
                indentType: 'tab',
                indentWidth: 1,
              }
            },
          },
        ]
      }
    ],
  },
});