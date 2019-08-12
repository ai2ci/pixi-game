const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode =
	process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
	mode,
	watch: mode != 'production',
	watchOptions: {
		ignored: [path.resolve(__dirname, 'node_modules/**')],
	},
	context: path.resolve(__dirname, 'src'),
	devtool: mode != 'production' ? 'inline-source-map' : 'eval-source-map',
	stats: 'minimal',
	entry: {
		main: path.resolve(__dirname, 'src/app.tsx'),
	},
	output: {
		filename: '[name]-[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		pathinfo: false,
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		clientLogLevel: 'silent',
		// noInfo: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Game',
			template: path.resolve(__dirname, 'src/app.html'),
		}),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'src/assets'), to: 'assets' },
		]),
	],
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
		],
	},
};
