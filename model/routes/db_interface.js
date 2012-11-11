var mongodb = require('mongodb');
//var url = require('url');
//var log = console.log;
var dbcon = require('../secrets').dbcon;
var mongohq_url = dbcon.mongohq_url;
 
 exports.handle_get = function(req, res){
  //res.render('home', { title: 'db persistence module' });
  //console.log(req.body);
  console.log("Got here via GET");
  res.send('Acking your request');  
};

exports.handle_post = function(req, res){
  //res.render('home', { title: 'db persistence module' });
  console.log("Got here via POST");
  var body = req.param('Body').trim();
  console.log("Demo");
  console.log(req.param('SmsMessageSid'));
  console.log(req.param('AccountSid'));
  console.log(req.param('From'));
  console.log(req.param('To'));
  console.log(body);

  
//  var connectionUri = url.parse(mongohq_url);
 // var dbName = connectionUri.pathname.replace(/^\//, '');
  
  mongodb.Db.connect(mongohq_url, function(error, client) {
  if (error) throw error;

    var collection = new mongodb.Collection(client, 'sms_logs');

    var document = {_system:"Demo", _SmsMessageSid:req.param('SmsMessageSid'), _twilioid:req.param('AccountSid'), _from_num:req.param('From'), 
                    _to_num:req.param('To'), _message:body};

   collection.insert(document, {safe: true}, function(error, records){
   if (error) throw error;
   console.log("record has been added as "+records[0]._id);   
   });
      
        // close the connection
    client.close();
    });
  //  });
  //});        
  //});  

};