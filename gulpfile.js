var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 4000
	})
});

gulp.task('browserify', function() {
	// Grabs the app.js file
    return browserify('./node_modules/which-country/index.js')
    	// bundles it and creates a file called bundle.js
        .bundle()
        .pipe(source('bundle.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/javascript/'));
});