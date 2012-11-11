var serve = function(textmsg){ 
var TwilioClient = require('../node_modules/twilio/lib').Client,
    creds = require('../secrets').Credentials,
    client = new TwilioClient(creds.sid, creds.authToken, creds.hostname);

var callee = client.getPhoneNumber(creds.outgoing);

callee.setup(function() {
        callee.sendSms(textmsg[0], textmsg[1], null, function() {});
});
};
exports.serve = serve;