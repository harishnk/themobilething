//textmsg.push("+13175094202", "damn this is cool");

var express = require('../model/node_modules/express'),
    http = require('http');
    //path = require('path');
    
var sms_server = express();

var reacttolink = require('../model/routes/reacttolink');

sms_server.configure(function(){
  sms_server.set('port', process.env.PORT || 8080);
  sms_server.use(express.logger('dev'));
  //sms_server.use(express.bodyParser());
  sms_server.use(express.query());
  });

sms_server.configure('development', function(){
  sms_server.use(express.errorHandler());
});

sms_server.get('/', reacttolink.react);
    
http.createServer(sms_server).listen(sms_server.get('port'), function(){
  console.log("SMS server listening...on port: " + sms_server.get('port'));
});


