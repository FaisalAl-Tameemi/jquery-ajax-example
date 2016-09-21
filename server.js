'use strict';

let express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 5000,
    publicDir = process.argv[2] || __dirname + '/public',
    path = require('path');

/*
	Define the routes below
*/

// home page
app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

// attach middleware
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

// start the server
app.listen(port, hostname, function(){
	console.log("Serving %s listening at http://%s:%s", publicDir, hostname, port);
});
