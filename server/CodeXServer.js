/* ============================================================
 *
 * This file is a part of CodeNameX project
 * http://thezeroth.net
 *
 * Date        : 04-04-2013
 * Description : Server Application Launch.
 *
 * Copyright (C) 2013      by Abhishek patil <abhishek@thezeroth.net>
 *
 * This program is free software; you can redistribute it
 * and/or modify it under the terms of the GNU General
 * Public License as published by the Free Software Foundation;
 * either version 2, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * ============================================================ */

// It's a http server
var server = require('./server'),
    util = require('util'),
    uuid = require('node-uuid');

var app = server(8080);

app.on("", function(query, req, res){
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end("<h1>Welcome to CodeNameX!</h1>");
});

////////////////////////////////////////////////////////////////////////////////
app.on("Auth", function(query, req, res) {
    if(req.method != "POST") {
        res.writeHead(405, {'Content-Type': 'text/plain' });
        res.end('{"error":"This function is accessible only with POST method!"}');
    }
    else {
        //console.dir(query);
        // Parse the query
        var data = query['_data'];
        var appreq = JSON.parse(data);
        var appkey, clid, clientname = "";
        // Check if client name is provided if its empty reply bad request 
        if(appreq.clientname) {
            clientname = appreq.clientname;
        }
        else {
            console.log("clientname name not found!");
            res.writeHead(400, {'Content-Type': 'text/plain' });
            res.end('{"error":"client name should not be empty!"}');
            return;
        }

        // If App key check with couch db for validation
        if(appreq.appkey) {
            console.log("Appkey : " +  appreq.appkey);
            appkey = appreq.appkey;
        }
        
        if(appreq.CLID) {
            console.log("CLID : " +  appreq.CLID);
            clid = appreq.CLID;
        }

        if(!clid) {
            // if DB has clid for this clientname 
            // use it 
            // else
            // make a new one and assinged and store in DB
        }
        // then
        // send CLID and challenge key to client
        // incription decription ;)

        res.writeHead(200, {'Content-Type': 'text/plain' });
        res.end(data);
        // if the query is null
          // make a challange action process
        // else
          // make a request to couchdb
          // reply of couch db will go back to Auth request
    }
});



// DB Coomunication
var dbHostname = "127.0.0.1";
var dbPort = 8888;

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

function add(db, data) {
    console.log("/add");
    requestPacket.path = "/add?dbname="+db;
    requestPacket.method = "POST";
    var postData = data;
    sendRequest(requestPacket, postData, function(statusCode){
        if(statusCode == 200)
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

////////////////////////////////////////////////////////////////////////////////
app.on("test", function(query, req, res){
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end("You Have send : \n" + util.inspect(query) + "  \n data : " + req.data);
});


