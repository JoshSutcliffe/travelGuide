// set up web server
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var wc = require('which-country');

// app.configure(function() {
// 	app.set('views', __dirname + '/public/views');
// 	app.set(express.static(path.join(__dirname, '/public')));
// });

// routes
// Does passing in app here cause app to append to the file path?
// require('./app/routes.js')(app);

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/public/views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// listen (start app with node server.js)
app.listen(3000, function() {
  console.log("server going");
});
