var mongodb = require('mongodb');
var url = require('url');
var log = console.log;
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

  
  var connectionUri = url.parse(mongohq_url);
  var dbName = connectionUri.pathname.replace(/^\//, '');
  
  mongodb.Db.connect(mongohq_url, function(error, client) {
  if (error) throw error;

  client.collectionNames(function(error, names){
    if(error) throw error;
// output all collection names
    log("Collections");
    log("===========");
    var lastCollection = null;
    names.forEach(function(colData){
      var colName = colData.name.replace(dbName + ".", '');
      log(colName);
      lastCollection = colName;
    });

    var collection = new mongodb.Collection(client, lastCollection);
    log("\nDocuments in " + lastCollection);
    var documents = collection.find({}, {limit:5});

    // output a count of all documents found
    documents.count(function(error, count){
      log("  " + count + " documents(s) found");
      log("====================");

      // output the first 5 documents
      documents.toArray(function(error, docs) {
        if(error) throw error;

        docs.forEach(function(doc){
          log(doc);
        });
      
        // close the connection
        client.close();
      });
    });
  });        
  });  

};