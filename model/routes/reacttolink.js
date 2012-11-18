
exports.react = function(req, res){
var server = require("../Send/serve.js");
//var textmsg = [];
console.log("got to link reactor");
server.serve(req,res);
};