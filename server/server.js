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
var http = require('http'),
    util = require('util'),
    eventEmitter = require('events').EventEmitter,
    URL = require('url');


//TODO Inherit eventEmiter and emit some events 
//util.inherits(Server, eventEmitter);

/*
  Calling this function directly wont give the the POST data
*/
var processRequest = function(request, response) {
    var parsedUrl = URL.parse(request.url);
    
    response.writeHead(200, {'Content-Type': 'text/plain' });
    response.end("<h1>It Works!</h1>" + util.inspect(parsedUrl));
};


var httpRequestReceive = function(request, response) {
    request.data = "";
    request.reading = false;
    request.readyRead = false;

    // If there is data from POST method keep it with request object in properly called data (custom property)
    request.on("data", function(data) {
	// It can be bigger then expected,
	// have to find put the correct way to do this
	request.data += data;
	request.reading = true;
    });
    
    request.on("end", function(){
	request.isReadyRead = true;
	request.reading = false;
    });

    processRequest(request, response);
};


exports.Server = function () {
    var httpServer = http.createServer();
    httpServer.on("request", httpRequestReceive);
    httpServer.listen(8080);
    return httpServer;
}


