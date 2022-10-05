const path = require('path');
const globule = require('globule');
const TerserPlugin = require("terser-webpack-plugin");

const assignPlugins = () => {
	/** Objects to pass to config */
	const assignObject = {
		output: {
			path: path.join(__dirname, '../dist'),
			filename: 'js/[name].js',
			publicPath: '../dist',
			chunkFilename: '[id].chunk.js',
		},
	};

	/** grep ts files */
	const tsFiles = (() =>
		globule.find([`**/*.ts`, '!**/*.d.ts'], {
			cwd: `${__dirname}/../src/js`
		})
	)();

	/** Create object containing entry files */
	const entriesList = tsFiles.reduce((temp, current) => {
		const fileName = current.replace(new RegExp(`.ts`, 'i'), '');
		temp[`${fileName}`] = `${__dirname}/../src/js/${fileName}.ts`;
		return temp;
	}, {});

	assignObject['entry'] = entriesList;

	return assignObject;
};

module.exports = env => (
	Object.assign({
		optimization: {
			minimize: env.WEBPACK_BUILD,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						keep_classnames: true,
					},
					extractComments: false,
				})
			],
		},
		resolve: {
			extensions: ['.js', '.ts'],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: [
						{
							loader: 'esbuild-loader',
							options: {
								target: 'es2019',
								sourcemap: !env.WEBPACK_BUILD
							},
						},
						{
							loader: 'ts-loader',
							options: { transpileOnly: true },
						}
					],
					exclude: '/**/*.d.ts'
				}
			],
		},
	}, assignPlugins())
);