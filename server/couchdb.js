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
      http = require('http');

var dbHostname = "127.0.0.1";
var dbPort = 5984;

// global req packets
var requestPacket = {
    hostname : dbHostname,
    port : dbPort,
    path: '',
    method: ''
};

var app = server(8888);

app.on("", function(query, req, res){
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end("<h1>Welcome to CodeNameX!</h1>");
});


app.on("showall", function(query, req, res){
    requestPacket.path = "/_all_dbs";
    requestPacket.method = "GET";
    sendRequest(requestPacket, res);
});

app.on("createdb", function(query, req, res) {
    var dbname = query['dbname'];
    requestPacket.path = "/"+dbname;
    requestPacket.method = "PUT";
    sendRequest(requestPacket, res);
});

app.on("deletedb", function(query, req, res) {
    var dbname = query['dbname'];
    requestPacket.path = "/"+dbname;
    requestPacket.method = "DELETE";
    sendRequest(requestPacket, res);
});

app.on("info", function(query, req, res) {
    var dbname = query['dbname'];
    requestPacket.path = "/"+dbname;
    requestPacket.method = "GET";
    sendRequest(requestPacket, res);
});
