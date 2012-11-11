var express = require('express'),
    http = require('http');
    
var sms_server = express();

var db_interface = require('../routes/db_interface');

sms_server.configure(function(){
  sms_server.set('port', process.env.PORT || 8080);
  sms_server.use(express.logger('dev'));
  sms_server.use(express.bodyParser());
  });
  
sms_server.configure('development', function(){
  sms_server.use(express.errorHandler());
});  

sms_server.get('/', db_interface.handle_get);
sms_server.post('/', db_interface.handle_post);  
    
http.createServer(sms_server).listen(sms_server.get('port'), function(){
  console.log("SMS server listening...on port: " + sms_server.get('port'));
});