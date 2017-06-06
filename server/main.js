var express = require('express'),
	server = express(),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	webpack = require('webpack'),
	webpackMiddleware = require('webpack-middleware'),
	config = require('./../webpack.config.js'),
	compiler = webpack(config);

var main = function(){


	server.set('port', (process.env.PORT || 5050 ));

	server.use(express.static(path.join(__dirname, '../dist')));
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: true}));
	server.use(webpackMiddleware(compiler));
	server.get('/', function response(req, res){
		res.sendFile(path.join(__dirname, 'dist/index.html'))
	})

	server.listen(server.get('port'), function(){
		console.log('started ' + server.get('port'))
	});

}

module.exports = main
