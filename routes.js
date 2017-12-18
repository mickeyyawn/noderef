'use strict';

var express = module.parent.exports.express;
var app = module.parent.exports.app;
var helmet = require('helmet');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var fs = require('fs');
var logs = require('./log');


var indexPage = fs.readFileSync(__dirname + '/' + 'index.html', 'utf8');
var fourOhFour = fs.readFileSync(__dirname + '/' + '404.html', 'utf8');

app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(helmet()); // enforce various security at header level
app.use(compression());



const logRouteHits = function(req, res, next){

  var request = {}
  request.path = req.path
  request.method = req.method  

  // TODO: Log requesting ip...
  //
  //if (logThisRoute(request.path)) {
  //
  // log all routes hits...
  //
  logs.info('Request: ', {request: request})
  //}

  next();
}

const fixDoubleSlashes = function(req, res, next){
  //
  // fix double slashes in routes...
  //
  req.url = req.url.replace(/[/]+/g, '/');

  next();

}

//
// for any request, we want to do a few things, comments in funcs explain them...
//
app.use(logRouteHits, fixDoubleSlashes);






// TODO:  do more route mapping like this:

/*

app.get('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.get('/user/:id/edit', user.edit);
app.put('/user/:id/edit', user.update);

*/











app.get('/', function(req, res) {

  //
  // remove this once we tested it...
  //
  logs.info('returning index page');

  res.status(200).send(indexPage);

});


app.get('/health', function(req, res) {

  res.status(200).json(app.locals.info);

});


// TODO:  404 is not working

//
// 404 handler
//
app.use(function (req, res, next) {
  logs.warn('404');  // TODO, flesh this out more ???
  res.status(404).send(fourOhFour);
})