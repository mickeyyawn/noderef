'use strict';

var process = require('process');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
process.env.NODE_ENV = process.env.NODE_ENV || 'PROD';
process.env.UV_THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE ||  36;

var express = require('express');
var app = express();
var routes;
var cluster = require('./cluster');
var http = require('http');
http.globalAgent.maxSockets = Infinity;
var logs = require('./log');
var fs = require('fs');

var packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));

app.locals.info = {
    environment: "",
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
app.locals.info.environment = process.env.NODE_ENV


//TODO:  make sure you are responding to system exit correctly
//TODO:  make sure you have health check best practices in Here
//TODO:  add morgan http request logger...




logs.info('Application is initializing...');

cluster.start(app);

module.exports.express = express;
module.exports.app = app;

routes = require('./routes');

logs.info(app.locals.info);

process.on('uncaughtException', err => {
    logs.error('something went wrong!', err);

    server.close(() => process.exit(1));
});