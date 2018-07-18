var express = require('express'),
	server = express(),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	webpack = require('webpack'),
	http = require('http'),
	webpackMiddleware = require('webpack-middleware'),
	config = require('./../webpack.config.js'),
	compiler = webpack(config),
	mongoose = require('mongoose'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session);

var main = function(){

	var port = process.env.PORT || 5050;

	server.set('port', port );

	server.use(express.static(path.resolve(__dirname, '../dist')));

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: true}));
	server.use(webpackMiddleware(compiler));
	mongoose.Promise = global.Promise;

	var mongoPromise;
	console.log(process.env.NODE_ENV)
	if(process.env.NODE_ENV == 'production'){
		mongoPromise = mongoose.connect('mongodb://dishymain:club123@ds243041.mlab.com:43041/dishy',
										{ useMongoClient: true });
	} else {
		mongoPromise = mongoose.connect('mongodb://localhost/testForAuth',
										{ useMongoClient: true });
	}

	mongoPromise.then((db) => {
		db.on('error', console.error.bind(console, 'connection error:'));
		server.use(session({
			secret: 'work',
			resave: true,
	   		saveUninitialized: false,
	   		store: new MongoStore({
	   		  mongooseConnection: db
	   		})
		}))
	})

	// API routes need to be configured first
	server.use(require('./users/route'))
	server.use(require('./restaurants/route'))

	// Application routes can be configured in general afterwards
	server.get('*', function response(req, res){
		res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
	})

	server.listen(server.get('port'), function(){

		console.log('started ' + server.get('port'))
	});

}

module.exports = main
