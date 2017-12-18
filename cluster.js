
var util = require('util');
var process = require('process');
var os = require('os');
var logs = require('./log');

const cluster = require('cluster');
const numCPUs = os.cpus().length;

const port = (process.env.NODE_PORT || 8080);
const host = (process.env.NODE_HOST || '0.0.0.0');

var start = function (app){

    if (cluster.isMaster) {
        // Fork workers.
        for (var i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      
        cluster.on('exit', (worker, code, signal) => {
          console.log(util.format('Worker %s died...', worker.process.pid));
          //
          // spin up another process since this one decided to exit
          //
          cluster.fork();
        });
      
      } else {
      
        app.listen(port, host);
      
        logs.info(util.format('Server running at http://%s:%s/' + ' PID: %s', host, port, cluster.worker.process.pid));
      
        process.title = util.format('Node - %s', app.locals.info.name);
      
        app.locals.info.port = port;
        app.locals.info.host = host;
        app.locals.info.platform = process.platform;
        app.locals.info.release = os.release();
        app.locals.info.processor = process.arch;
        // TODO:  Show the processor details (family? speed?)
        app.locals.info.numCPUs = numCPUs;
        app.locals.info.nodeVersion = process.version;
    
      
      }

}




module.exports.start = start;