/*
DatNoS API test client

@copyright 2022 infinite trust digital gmbh
@author    Christian Baumann cba@infinite-trust-digital.com
@version   v0.1 2022/06/26

A valid DatNoS request looks like this example (the data elements can be set to anything needed)
{
   "keys":[
      "IMM2022_project_0",
      "3100"
   ],
   "data":{
      "device":"33123b9d-5f7c-4eb2-9344-b35943815ed5",
      "temp":12.34190,
      "hum":56.731,
      "power":0.4231,
      "timeStamp":"2022-05-06T09:33:12.093486",
      "comment":"n/a"
   }
}
*/
https = require('https');
// following apiToken is not valid
// get your apiToken from c.baumann@baumann.at
var apiToken = 'cf2ec2413f00cf9e529c46656fcec3e69adbcdc04bcda873202d7ce6d4843bb0'; 

var options = {
    hostname: 'blockchains.web-lab.at',
    port: 443,
    path: '/datnos-api/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-ApiToken': apiToken
    }
};
var req = https.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
        console.log('Body: ' + body);
    });
});
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// build Json payload with data and keys
// example for document id, device id ...
var uuid = '0f00dbcc-5f7c-4eb2-9344-b35943815ed5';

// current date/time
var date = new Date();
var timeStamp = date.toISOString();

var power = Math.floor(Math.random() * 1000);

var data = {
    timeStamp: timeStamp,
    device: uuid,
    power: power,
    comment: 'avg. load'
}

// example for keys
var keys = ['IMM2022_project_0_js', '3100'];
var request = {
    keys: keys,
    data: data
}
postData = JSON.stringify(request);
console.log('------------------------------------');
console.log('DatNos Test ...');
console.log('JSON-Request:')
console.log(postData)
console.log('------------------------------------')
req.write(postData);
req.end();