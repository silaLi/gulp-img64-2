var assert   = require('assert');
var gutil    = require('gulp-util');
var img64 = require('../index');
var fs       = require('fs');
var path     = require('path');
var mime	= require('mime');

describe('gulp-img64', function() {
	describe('in buffer mode', function() {

		it('should maxWeightResource will be 10240. and replace images in DOM with base64 data, when its size less than 10240 ', function(done) {

			var filename = path.join(__dirname, '/fixtures/input.html');

			var input = new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});

			var stream = img64();

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output1.html'), 'utf8'));
				done();
			});

			stream.write(input);

		});

		it('should replace images which its size less than maxWeightResource in DOM with base64 data', function(done) {

			var filename = path.join(__dirname, '/fixtures/input.html');

			var input = new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});

			var stream = img64({
				maxWeightResource: 12000
			});

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output2.html'), 'utf8'));
				done();
			});

			stream.write(input);

		});

		it('should only replace a part of images in DOM with base64 data, when their size less than maxAllWeightResource. ver1', function(done) {

			var filename = path.join(__dirname, '/fixtures/input.html');

			var input = new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});

			var stream = img64({
				maxAllWeightResource: 15000
			});

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output31.html'), 'utf8'));
				done();
			});

			stream.write(input);

		});

		it('should only replace a part of images in DOM with base64 data, when their size less than maxAllWeightResource. ver2', function(done) {

			var filename = path.join(__dirname, '/fixtures/input.html');

			var input = new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});

			var stream = img64({
				maxWeightResource: 12000,
				maxAllWeightResource: 15000
			});

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output32.html'), 'utf8'));
				done();
			});

			stream.write(input);

		});

		it('should only replace a part of images in DOM with base64 data, when their size less than maxAllWeightResource with starting startWeightResource', function(done) {

			var filename = path.join(__dirname, '/fixtures/input.html');

			var input = new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});

			var stream = img64({
				maxWeightResource: 12000,
				startWeightResource: 3000,
				maxAllWeightResource: 15000
			});

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output4.html'), 'utf8'));
				done();
			});

			stream.write(input);

		});

		it('should only replace a part of images in DOM with base64 data, when their size less than maxAllWeightResource with starting startWeightResource', function(done) {

			var filename = path.join(__dirname, '/fixtures/input5.html');

			var input = new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});

			var stream = img64({
				maxWeightResource: 10400,
				maxAllWeightResource: 12200,
				isMoreImg: true
			});

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output5.html'), 'utf8'));
				done();
			});

			stream.write(input);

		});

	});
});