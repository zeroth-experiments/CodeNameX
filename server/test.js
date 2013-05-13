var server = new require('./server'),
util = require('util'),
http = require('http');

var dbHostname = "127.0.0.1";
var dbPort = 8080;

// global req packets
var requestPacket = {
    hostname : dbHostname,
    port : dbPort,
    path: '',
    method: ''
};

function postTest() {
    // POST test
    console.log("/Auth POST Test!");
    requestPacket.path = "/Auth";
    requestPacket.method = "POST";
    var postData = "{ 'appkey':'', 'CLID':'', 'clientname':'testclient' }";
    sendRequest(requestPacket, postData);
}
function getTest(){
    console.log("/Auth GET Test!");
    requestPacket.path = "/Auth";
    requestPacket.method = "GET";
    var postData = "{ 'appkey':'', 'CLID':'', 'clientname':'testclient' }";
    sendRequest(requestPacket, postData);
}

function sendRequest(reqPack, res){
    var client = http.request(reqPack, function(response){
	response.data = "";
	response.on("data", function(chunk){
	    response.data += chunk;
	});

	response.on("end", function(){
	    console.log("Test Packet :\n\t " + util.inspect(reqPack) + "\n");
	    console.log("Test Response : \n\t" +response.data + "\n");
	});
    });

    if(res != "" && reqPack['method'] == "POST")
	client.write(res);

    client.end();
}

postTest();