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
						query: {presets: ['es2015']},
						exclude: /(node_modules)/
					}
				]
			}
		},
		webpackMiddleware: {
			stats: { // The stats actually used in build and dev-server scripts
				colors: true,
				reasons: false,
				hash: false,
				version: false,
				timings: false,
				chunks: false,
				chunkModules: false,
				cached: false,
				cachedAssets: false
			}
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
