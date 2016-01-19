/*eslint-disable no-var */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var argv = require('minimist')(process.argv.slice(2));

var SOURCE_DIR = require('path').resolve(__dirname, '..', 'src');
var RELEASE_DIR = require('path').resolve(__dirname, '..', 'lib');


var DEBUG = !!(argv.debug || argv.d);
var VERBOSE = !!(argv.verbose || argv.v);
var ENTRY_POINT = './index.js';

module.exports = {
	context: SOURCE_DIR,
	entry: [ENTRY_POINT],
	output: {
		path: RELEASE_DIR,
		filename: 'index.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.js/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0']
				},
				exclude: /(node_modules)/
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'js/vendors.js'}),
		// extracts css and put it to <output.path>/css/style.css
		new ExtractTextPlugin('css/style.css'),
		new HtmlPlugin({
			// gets the index.html from SOURCE_DIR as a template and create
			// from it <output.path>/index.html
			template: SOURCE_DIR + '/index.html',
			filename: 'index.html'
		})
	],
	stats: { // The stats actually used in build and dev-server scripts
		colors: true,
		reasons: DEBUG,
		hash: VERBOSE,
		version: VERBOSE,
		timings: VERBOSE,
		chunks: VERBOSE,
		chunkModules: VERBOSE,
		cached: VERBOSE,
		cachedAssets: VERBOSE
	}
};

/*eslint-enable no-vars*/
