'use strict';

var express = require('express');
var app = express();
var routes;
var fs = require('fs');
var util = require('util');
var process = require('process');
var os = require('os');
var http = require('http');
var log = require('./log');

const cluster = require('cluster');
const numCPUs = os.cpus().length;
var packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const appName = packageJSON.name;
const appVersion = packageJSON.version;

http.globalAgent.maxSockets = Infinity;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const port = (process.env.NODE_PORT || 8080);
const host = (process.env.NODE_HOST || '127.0.0.1');


log.info('Application is initializing...');


if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    //console.log(`worker ${worker.process.pid} died`);
    console.log(util.format('Worker %s died...', worker.process.pid));
    //
    // spin up another process since this one decided to exit
    //
    cluster.fork();
  });

} else {

  app.listen(port, host);

  console.log(util.format('Server running at http://%s:%s/' + ' PID: %s', host, port, cluster.worker.process.pid));

  // expose express, server, cluster and the logger now that we have created
  // our cluster of processes and express is listening
  // to the specified host/port

  module.exports.express = express;
  module.exports.app = app;

  // collect info about the server/environment/app to use in a health route

  var info = {};


  // set the process title based on what is in package.json

  process.title = util.format('Node - %s', packageJSON.name);

  info.port = port;
  info.host = host;
  info.name = appName
  info.version = appVersion;
  info.cluster = cluster;
  info.process = process;
  info.os = os;
  info.numCPUs = numCPUs;

  module.exports.info = info;

  //module.exports.log = log;

  // bring in the routes module now that everything is good to go,
  // we can now start listening for requests...

  routes = require('./routes');

}
