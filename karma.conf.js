/*eslint-disable no-var */
var webpackConfig = require('./webpack/config');

module.exports = function conf(config) {
	config.set({
		frameworks: ['mocha', 'sinon-chai'],
		plugins: [
			require('karma-webpack'),
			require('karma-sinon-chai'),
			require('karma-mocha'),
			require('karma-phantomjs-launcher'),
			require('karma-mocha-reporter')
		],
		files: [
			'./node_modules/phantomjs-polyfill/bind-polyfill.js',
			'./node_modules/array.from/array-from.js',
			'src/**/*.test.js'
		],
		preprocessors: {
			'src/**/*.js': ['webpack']
		},
		webpack: {
			module: {
				loaders: [
					{
						test: /\.js/,
						loader: 'babel',
						query: {presets: ['es2015', 'stage-0', 'react'], plugins: ['rewire']},
						exclude: /(node_modules)/
					},
					{test: /\.scss/, loader: 'css!sass'}
				]
			}
		},
		webpackMiddleware: {
			stats: webpackConfig.stats
		},
		reporters: ['mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false,
		concurrency: Infinity
	});
};

/*eslint-enable no-vars*/
