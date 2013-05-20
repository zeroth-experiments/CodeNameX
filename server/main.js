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
var server = new require('./server'),
    util = require('util');

var app = server();

app.on("", function(query, req, res){
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end("<h1>Welcome to CodeNameX!</h1>");
});

////////////////////////////////////////////////////////////////////////////////
app.on("Auth", function(query, req, res) {
    if(req.method != "POST") {
	res.writeHead(405, {'Content-Type': 'text/plain' });
	res.end("This function is accessible only with POST method!");
    }
    else {
	res.writeHead(200, {'Content-Type': 'text/plain' });
	res.end("{'ok':true}");
        console.dir(query);
    }
});

////////////////////////////////////////////////////////////////////////////////
app.on("test", function(query, req, res){
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end("You Have send : \n" + util.inspect(query) + "  \n data : " + req.data);
});
