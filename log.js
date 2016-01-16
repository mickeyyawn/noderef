var bunyan = require('bunyan');
var log;

var reqSerializer = function (req) {

  return {
    method: req.method,
    url: req.url,
    headers: req.headers
  }

}

var createLogger = function () {

  return bunyan.createLogger({
  	name: 'noderef',
  	serializers: {
  		req: reqSerializer
  	},
    streams: [
      {
        level: 'info',
        stream: process.stdout
      },
      {
        level: 'info',
        path: 'noderef.log'
      }
    ]
  });

}

if (!log){
  log = createLogger();
}


module.exports = log;
