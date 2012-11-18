var serve = function(req,res){ 
var TwilioClient = require('../node_modules/twilio/lib').Client,
    creds = require('../secrets').Credentials,
    client = new TwilioClient(creds.sid, creds.authToken, creds.hostname);

var callee = client.getPhoneNumber(creds.outgoing);

var num = req.query.num; //req.params('num').trim();
var msg = req.query.msg; //req.params('msg').trim();

callee.setup(function() {
        callee.sendSms(num, msg, null, function() {});
});
};
exports.serve = serve;