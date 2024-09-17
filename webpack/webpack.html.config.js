const path = require('path');
const globule = require('globule');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HtmlWebpackSkipAssetsPlugin } = require('html-webpack-skip-assets-plugin');

const assignPlugins = (env) => {
  const tsxGlobuleFiles = ['**/*.tsx', '!**/_*.tsx', '!**/_partials/**/*.tsx'];

  /** grep tsx files */
  const templateFiles = globule.find([...tsxGlobuleFiles], {cwd: `${__dirname}/../src/pages`});

  /** Create object containing entry files */
  const entriesList = templateFiles.reduce((temp, current) => {
    temp[`${current.replace(/(.tsx)$/i, '.html')}`] = `${__dirname}/../src/pages`;
    return temp;
  }, {});

  /** Objects to pass to config */
  const assignObject = { plugins: [] };
  for (const [htmlFileName, tempFileName] of Object.entries(entriesList)) {
    assignObject.plugins.push(new HtmlWebpackPlugin({
      filename: htmlFileName,
      template: tempFileName
    }));
    env.WEBPACK_BUILD && assignObject.plugins.push(new HtmlWebpackSkipAssetsPlugin({ excludeAssets: [/entry.js/] }));
  }

  return assignObject;
};

module.exports = env => (
  Object.assign({
    entry: './src/entry.js',
    output: {
      path: path.join(__dirname, '../dist'),
      filename: './entry.js'
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                name: 'tsx-loader-pool',
              }
            },
            {
              loader: 'esbuild-loader',
              options: {
                loader: 'tsx',
              }
            }
          ]
        },
      ],
    },
  }, assignPlugins(env))
);
