#!/usr/bin/env node

var server = new require('./server'),
util = require('util'),
http = require('http');

var dbHostname = "127.0.0.1";
var dbPort = 8888;

// global req packets
var requestPacket = {
    hostname : dbHostname,
    port : dbPort,
    path: '',
    method: ''
};

function showall() {
    console.log("/showall");
    requestPacket.path = "/showall";
    requestPacket.method = "GET";
    var postData = "";
    sendRequest(requestPacket, postData, function(statusCode){
        if(statusCode == 200)
            console.log("Test OK");
        else
            console.error("Test Fail!");
    });
}

function createdb() {
    console.log("/createdb");
    requestPacket.path = "/createdb";
    requestPacket.method = "POST";
    var postData = '{ "dbname":"testdb"}';
    sendRequest(requestPacket, postData, function(statusCode){
        if(statusCode == 200)
            console.log("Test OK");
        else
            console.error("Test Fail!");
    });
}

function deletedb() {
}

function info() {
}

function add() {
}

function find(data) {
}

function postTest() {
    // POST test
    console.log("/Auth POST Test!");
    requestPacket.path = "/Auth";
    requestPacket.method = "POST";
    var postData = "{ 'appkey':'', 'CLID':'', 'clientname':'testclient' }";
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
	    console.log("Test Response : \n\t" +response.data + " :: " + response.statusCode +"\n");
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
        case "showall": {
            showall();
            break;
        }
        case "createdb": {
            createdb();
            break;
        }
        default: console.log("Unrecognised function name " + functionName);
        
    }

}

main();

