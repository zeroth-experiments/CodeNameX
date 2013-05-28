#!/usr/bin/env node

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
    requestPacket.path = "/Auth?db=user";
    requestPacket.method = "POST";
    var postData = '{ "appkey":"", "CLID":"", "clientname":"testclient" }';
    sendRequest(requestPacket, postData, function(statusCode){
        if(statusCode == 200)
            console.log("Test OK");
        else
            console.error("Test Fail!");
    });
}

function getTest(){
    console.log("/Auth GET Test!");
    requestPacket.path = "/Auth";
    requestPacket.method = "GET";
    var postData = "{ 'appkey':'', 'CLID':'', 'clientname':'testclient' }";
    sendRequest(requestPacket, postData, function(statusCode){
        if(statusCode == 405)
            console.log("Test OK");
        else
            console.error("Test Fail!");
    });
}

function sendRequest(reqPack, res, callBack){
    var client = http.request(reqPack, function(response){
	response.data = "";
	response.on("data", function(chunk){
	    response.data += chunk;
	});

	response.on("end", function(){
	    console.log("Test Response : \n\t" +response.data + "\n");
            callBack(response.statusCode);
	});
    });

    if(res != "" && reqPack['method'] == "POST") {
	client.write(res);
    }

    client.end();
}

function main() {
    if( process.argv.length < 3) {
        console.log("Please provide the name of the function you want to test!");
        return;
    }

    var functionName = process.argv[2];
    functionName = functionName.trim().toLowerCase();

    switch(functionName) {
        case "gettest": {
            getTest();
            break;
        }
        case "posttest": {
            postTest();
            break;
        }
        default: console.log("Unrecognised function name " + functionName);
        
    }

}

main();

