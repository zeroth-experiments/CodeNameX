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

/**
How to use
var srever = requier("./server")
var app = server(); // creates the server which listen on port 8080
app.on("event", function(query,request, response){
    //Do something
});
*/

// It's a http server
var http = require('http'),
    util = require('util'),
    eventEmitter = require('events').EventEmitter,
    URL = require('url');

var eventDirectory=[];

// Helping function copied from connect module 
function merge(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

//Class Server
var Server = function(){}

//Inherit eventEmiter and emit some events 
util.inherits(Server, eventEmitter);

// Server class object to be expose 
var server = new Server();

// Expose Server Function 
exports = module.exports = function () {
    var httpServer = http.createServer();
    httpServer.on("request", httpRequestReceive);
    httpServer.listen(8080);

//    merge(server, httpServer);
    return server;
};



//  Calling this function directly wont give the the POST data
function processRequest(request, response) {
    var parsedUrl = URL.parse(request.url, true);
    
    //take a data from URL
    var pathName = parsedUrl['pathname']
    var query = parsedUrl['query'];
    
    // create a data to send for event
    var pathSplit = pathName.split("/");
    var moduleName = "";
    var subModule = "";
    if(pathSplit.length >= 2) {
        moduleName = pathSplit[1];
        if(pathSplit.length >2) {
            subModule = pathSplit[3]
        }
    }
    query["subModule"] = subModule;
    
    if(!isEventExist(moduleName)) {
	response.writeHead(200, {'Content-Type': 'text/plain' });
	response.end("404 Page not found ! \n Module \"" + moduleName + "\" does not exist!");
    }

    server.emit(moduleName, query, request, response);
    
};


function httpRequestReceive(request, response) {
    request.data = "";
    request.reading = false;
    request.readyRead = false;

    // If there is data from POST method keep it with request object in properly called data (custom property)
    request.on("data", function(data) {
	// It can be bigger then expected,
	// have to find out the correct way to do this
        // Or may be this is good!
	request.data += data;
	request.reading = true;
    });
    
    request.on("end", function(){
	request.isReadyRead = true;
	request.reading = false;
    });

    processRequest(request, response);
};


// Event manager
function isEventExist(event) {
    if(eventDirectory.indexOf(event) == -1) {
	return false;
    }
    return true;
}

server.on("newListener", function(event, listner) {
    if(!isEventExist(event))
	eventDirectory.push(event);
});

server.on("removeListener", function(event, listner){
    if(isEventExist(event))
	eventDirectory.splice(eventDirectory.indexOf(event), 1);
});