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


var funct = (a) => { console.log(a + 1) }

var main = function(){

	var port = process.env.PORT || 5050;

	server.set('port', port );

	server.use(express.static(path.join(__dirname, '../dist')));

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: true}));
	server.use(webpackMiddleware(compiler));
	mongoose.Promise = global.Promise;

	var promise = mongoose.connect('mongodb://localhost/testForAuth',
									{ useMongoClient: true });

	promise.then((db) => {
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

	server.get('/', function response(req, res){
		res.sendFile(path.join(__dirname, 'dist/index.html'))
	})

	server.use(require('./users/route'))
	server.use(require('./restaurants/route'))

	server.listen(server.get('port'), function(){

		console.log('startd ' + server.get('port'))
		funct(1)
	});

}

module.exports = main
