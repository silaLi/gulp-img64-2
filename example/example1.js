var gulp = require('gulp');
var path = require('path');
var img64 = require('../index');


var filename = path.join(__dirname, '/fixtures/input.html');
gulp.src(filename)
	.pipe(img64())
	.pipe(gulp.dest("example1"));