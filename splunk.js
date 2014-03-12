var EventStream = require('elroy-event-stream');
var storm = require('splunkstorm');

var API_KEY = process.env.API_KEY;
var PROJECT_ID = process.env.PROJECT_ID;

var logger = new storm.Log(API_KEY, PROJECT_ID);

var c = new EventStream('ws://elroy-cloud.herokuapp.com/events');

c.on('open', function() {
  console.log('collector opened');

  c.subscribe('_logs', function(log) {
    logger.send(JSON.stringify(log));
  });
});

