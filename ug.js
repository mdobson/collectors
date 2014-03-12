var EventStream = require('elroy-event-stream');
var UG = require('usergrid');

var apigee = new UG.client({
  orgName: 'mtraining',
  appName: 'sandbox'
});

var c = new EventStream('ws://elroy-cloud.herokuapp.com/events');

c.on('open', function() {
  console.log('collector opened');

  c.subscribe('_logs', function(log) {
    var o = {
      type: '_elroylogs', 
      data: log
    };

    apigee.createEntity(o, function(err, res) {
      if(err) {
        console.log('Error:', res);
      } else {
        console.log('Collected');
      }
    });
  });
});

