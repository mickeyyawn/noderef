'use strict';

var express = module.parent.exports.express;
var app = module.parent.exports.app;
var helmet = require('helmet');
var info = module.parent.exports.info;
var router = express.Router();
var bodyParser = require('body-parser');
var util = require('util');
var fs = require('fs');
var log = require('./log');

var indexPage;

app.use('/', router);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(helmet()); // enforce various security at header level

//
// fix double slashes in routes...
//
app.use(function (req,res,next) {
  req.url = req.url.replace(/[/]+/g, '/');
  next();
});

router.get('/', function(req, res) {

  log.info({req: req}, 'returning index.html');

  if(!indexPage){
    indexPage = fs.readFileSync(__dirname + '/' + 'index.html', 'utf8');
  }

  res.send(indexPage);

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
