var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var wc = require('which-country');
var gulp = require('gulp')
var connect = require('gulp-connect')

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 4000
	})
});