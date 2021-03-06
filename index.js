'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

module.exports = function(opt) {
	opt = opt || {};
	opt.maxWeightResource = opt.maxWeightResource || 10240;
	opt.maxAllWeightResource = opt.maxAllWeightResource || -1;
	opt.startWeightResource = opt.startWeightResource || 0;
	opt.isMoreImg = opt.isMoreImg || false;

	// create a stream through which each file will pass
	return through.obj(function(file, enc, callback) {
		var self = this;
		if (file.isNull()) {
			self.push(file);
			// do nothing if no contents
			return callback();
		}

		if (file.isStream()) {
			self.emit('error', new gutil.PluginError('gulp-img64', 'Streaming not supported'));
			return callback();
		}

		if (file.isBuffer()) {
			var $ = cheerio.load(String(file.contents));
			var files = [];
			var imgs = $('img');
			for (var i = 0, len = imgs.length; i < len; i++) {
				var $img = $(imgs[i]);
				if ($img.attr('src')) {
					var ssrc = $img.attr('src');
					var isdata = ssrc.indexOf("data");
					if (ssrc != "" && typeof ssrc != 'undefined' && isdata !== 0) {
						var spath = path.join(file.base, ssrc);
						// locate the file in the system
						var exist = fs.existsSync(spath);
						if (!exist) {
							console.error("Can't find " + spath);
							continue;
						}
						var mtype = mime.lookup(spath);
						if (mtype != 'application/octet-stream') {
							var states = fs.statSync(spath);
							files.push({
								fileSize: states.size,
								filePath: spath,
								el: $img
							});
						}
					}
				}
			}
			if (opt.isMoreImg) {
				files.sort(function(a, b) {
					return a.fileSize - b.fileSize;
				})
			}
			for (var i = 0; i < files.length; i++) {
				var thisFile = files[i];
				if (thisFile.fileSize > opt.maxWeightResource) {
					continue;
				}
				if (opt.maxAllWeightResource > -1 && opt.startWeightResource + thisFile.fileSize > opt.maxAllWeightResource) {
					continue;
				}
				opt.startWeightResource += thisFile.fileSize;
				var sfile = fs.readFileSync(thisFile.filePath);
				var simg64 = new Buffer(sfile).toString('base64');
				thisFile.el.attr('src', 'data:' + mtype + ';base64,' + simg64);
			}

			var output = $.html();

			file.contents = new Buffer(output);

			return callback(null, file);
		}
	});
};