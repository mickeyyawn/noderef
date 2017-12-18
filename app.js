'use strict';

var express = require('express');
var process = require('process')
var app = express();
var routes;
var cluster = require('./cluster');
var http = require('http');
var logs = require('./log');
var fs = require('fs');


http.globalAgent.maxSockets = Infinity;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));

app.locals.info = {
    name: "",
    version: "",
    port: "",
    host: "",
    platform: "",
    release: "",
    processor: "",
    numCPUs: "",
    nodeVersion: ""
};
app.locals.info.name = packageJSON.name;
app.locals.info.version = packageJSON.version;




//TODO:  set node_env to production ???
//TODO:  make sure you are responding to system exit correctly
//TODO:  make sure you have health check best practices in Here
//TODO:  add morgan http request logger...




logs.info('Application is initializing...');

cluster.start(app);

module.exports.express = express;
module.exports.app = app;

routes = require('./routes');

logs.info(app.locals.info);