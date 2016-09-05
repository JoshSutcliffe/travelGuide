// set up web server
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// routes
require('./app/routes.js')(app);

// listen (start app with node server.js)
app.listen(3000, function() {
  console.log("server going");
})
