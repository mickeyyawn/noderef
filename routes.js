'use strict';

var express = module.parent.exports.express;
var app = module.parent.exports.app;
var info = module.parent.exports.info;
var router = express.Router();
var bodyParser = require('body-parser');
var util = require('util');

app.use('/', router);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//
// fix double slashes in routes...
//
app.use(function (req,res,next) {
  req.url = req.url.replace(/[/]+/g, '/');
  next();
});

router.get('/', function(req, res) {

  var response = {
    status:  'ok',
    message: 'hello world!!!'
  };


  //res.send('Hello from Worker ' + cluster.worker.id);

  console.log('Request to worker %d', info.cluster.worker.pid);

  res.send('hello world from express!');
});



router.get('/health', function(req, res) {

  var response = {
    name: info.name,
    version: info.version,
    nodeVersion: info.process.version,
    uptime: info.process.uptime(),
    server:{
      pid: info.process.pid,
      clusterpid: info.cluster.worker.id,
      port: info.port,
      ip: info.host,
      cpus: info.numCPUs,
      platform: info.process.platform,
      release: info.os.release(),
      processor: info.process.arch,
      freemem: info.os.freemem(),
      memory: util.inspect(info.process.memoryUsage())
    }

  };

  res.status(200).json(response);

});
