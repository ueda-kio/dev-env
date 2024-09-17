module.exports = env => ([
  {
    name: 'html',
    ...require('./webpack/webpack.html.config.js')(env),
  },
  {
    name: 'js',
    // optimization: {
    //   minimize: false
    // },
    ...require('./webpack/webpack.js.config.js')(env),
  },
  {
    name: 'scss',
    // optimization: {
    //   minimize: false
    // },
    ...require('./webpack/webpack.scss.config.js')(env),
  },
  {
    ...require('./webpack/webpack.common.config')(env)
  }
]);
