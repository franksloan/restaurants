var path = require('path');

module.exports = {
	entry: path.join(__dirname, 'src/main.js'),
	output: {
	    path: path.join(__dirname, '/dist/'),
	    filename: 'index.js',
	    publicPath: '/'
	},
	externals: {
	    'cheerio': 'window',
	    'react/lib/ExecutionEnvironment': true,
	    'react/lib/ReactContext': true,
	},
	devServer: {
	    hot: true,
	    inline: true,
	    port: 3000,
	    historyApiFallback: {
				rewrites: [
					{ from: /^\/$/, to: '/dist/index.html'},
					{ from: /^\/map/, to: '/dist/index.html'},
					{ from: /^\/graph/, to: '/dist/index.html'}
				]
			}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
			  test: /\.css$/,
			  loader: 'style-loader'
			}, {
			  test: /\.css$/,
			  loader: 'css-loader',
			  query: {
			    modules: true,
			    localIdentName: '[name]__[local]___[hash:base64:5]'
			  }
			}
		]
	},
	resolve: {
		alias: {
			'react': path.join(__dirname, 'node_modules', 'react')
		}
	}
}
