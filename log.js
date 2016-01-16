var bunyan = require('bunyan');

function reqSerializer(req) {

  return {
    method: req.method,
    url: req.url,
    headers: req.headers
  }

}

var log = bunyan.createLogger({
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

module.exports = log;
