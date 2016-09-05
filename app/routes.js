// set up all routes here
var express = require('express');

module.exports = function (app) {

  app.get('*', function (req, res) {
      // massive hack with absolute URL need to find a fay to fix __dirname
      res.sendFile('/Users/badman/githubRepos/travelGuide/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

};
