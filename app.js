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


const exerciseRedis = () => {

    var redis = require("redis"),
    client = redis.createClient();
    // hash / some key / some value  e.g. a hash in the redis map can have multiple keys...
    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset("hash key", "a different key at the same hash location", "some new value", redis.print);


    // test to see if hash/key exists...

    client.hexists("hash key", "hashtest 1", (err, data) => {
      if (data == 1) {
          console.log('hash/key exists...')
      }
      else {
        console.log('hash/key DOES NOT exist...')
      }
      //
      // let's destroy the client conn
      //
      client.quit();
    });

}

exerciseRedis();


process.on('uncaughtException', err => {
    logs.error('something went wrong!', err);

    server.close(() => process.exit(1));
});