const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
let options = {
	mode: 'development',
	devtool: false,
	entry: {
		audio_worker: path.resolve('./src/background/audio_worker.js'),
		service_worker: path.resolve('./src/background/service_worker.js'),
		main: path.resolve('./src/main.js'),
		style: path.resolve('./src/background/style.css'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'], // add a new rule for your CSS files
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve('src/manifest.json'),
					to: path.resolve('dist'),
				},
			],
		}),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
};
module.exports = options;
