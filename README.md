# gulp-img64 [![Build Status](https://travis-ci.org/247even/gulp-img64.png)](https://travis-ci.org/247even/gulp-img64)

Convert and replace image-files within your DOM/HTML to base64-encoded data.

## Example

##### gulpfile.js

```js
var gulp = require('gulp');
var img64 = require('gulp-img64');

gulp.task('default', function () {
	gulp.src('index.html')
		.pipe(img64())
		.pipe(gulp.dest('path'));
});
```

##### gulpfile.js option
###### maxWeightResource : default 10240
```js
// maxWeightResource: a img size must less than maxWeightResource
var gulp = require('gulp');
var img64 = require('gulp-img64');

gulp.task('default', function () {
	gulp.src('index.html')
		.pipe(img64({
			maxWeightResource: 4000
		}))
		.pipe(gulp.dest('path'));
});
```

###### maxAllWeightResource : default unlimited
```js
// maxAllWeightResource: all the selected images size must less than maxAllWeightResource
var gulp = require('gulp');
var img64 = require('gulp-img64');

gulp.task('default', function () {
	gulp.src('index.html')
		.pipe(img64({
			maxAllWeightResource: 4000
		}))
		.pipe(gulp.dest('path'));
});
```

###### startWeightResource : default 0
```js
// startWeightResource: It must use with maxAllWeightResource, so all the selected images size must less than (maxAllWeightResource - startWeightResource)
var gulp = require('gulp');
var img64 = require('gulp-img64');

gulp.task('default', function () {
	gulp.src('index.html')
		.pipe(img64({
			startWeightResource: 1000,
			maxAllWeightResource: 4000
		}))
		.pipe(gulp.dest('path'));
});
```

##### index.html // Before...

```js
<html>
	<head>
	</head>
	<body>
		<body>
			<img src="small.png" alt="">
			<img src="big.png" alt="">
...
```


##### path/index.html // ...after:

```html
<html>
	<head>
	</head>
	<body>
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3RTE3MkQyRDY5QzZFNTExOTBFNkJCMjExNUUyMUEzRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNkY1ODcwQTAwNzcxMUU2QTMzQUVFMjRBRUZGREE3NSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNkY1ODcwOTAwNzcxMUU2QTMzQUVFMjRBRUZGREE3NSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1MjM4MzA2NkJGQ0U1MTE5QTcxODE4NEQ3NDZDRjM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdFMTcyRDJENjlDNkU1MTE5MEU2QkIyMTE1RTIxQTNEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Hgk+FgAAAu5JREFUeNqslktsTVEUhu+9qWo0lHgkkqIklGpU0HpGPSb0kiCEGKgJFYl4dyQiwsRjIBGJx0QkQgcNelstg6JpBZUQz0EFVQZeoSGqN9S3mv/IzsnpvbTdyZdz795nr3+vvdZe+4Q/5k4MJWh9YT4sg5kwCjLgK7yG23AJauFnV0YiXfSnwEZ4ATvhIRRDFoT1LFa/jb+CHZAaZCwc4Ek2lEELlMKTUPJmRg5BJqyG54k8yYcbcAKi/ygQ0ntRzbP50/3b4rXxUAnroDrUvXZSsaqAuZ5Hnid94CLs6YGA16plp0x2/4psVQxOhXqnmZ03stspkqYMKf1fS+HU1BrogDb9dmOxW3bTTGQJPE4WZAxkQiH0d7r3wSxYD9Zfx/hCjT2V3aURZUV5AuPZcFXuW+acd4Y/wRlYo9Stg6POuNktsuyaCse6EDAvL0C6020e2eoXwCB5sRg2SdBdhFWEzSYyUic2SKDcyxCnTYZ63/+9Kju2mM/O2EsYkaJa9MUnMFYemECbzs8d+AD9IA+Ww1D4Do0d7e31zIv6dsVqXIbFpBUG+lZ7QKu6rDp1GIZrtU0YLOE5Bq5YYKEZgSn0V8J+x4450BpRQLN8IjbxGayCCdAA21UUqzGYj7Fvtt96fxjsCgjraDt/JnJPK3SbbVEDhuI8V8JZ2AaPVIUL9J67A+8DRMzuXROpghW+wXOWeqx4MM+38AvGwTTFpYKxdBVEL5WPBIhY3KoiKma5Ktfuaa1VCjbp9w+ViRkqfg+cZyFet/gEcmBS54J0n9h+ztPpd7PM3F0rDyyrhoB5905xsiIYQ+B3gBcxuGlJ44lYqjbCcTjdCwVyA2zRQY9790lcZeGWsq0n5X4RHNRWxv03o10wRfKkpJsCJZofda9g//VrWzZbHxExXzIkajl630Tm6Fgk/Fpp1h1tk2rguopfnk6wd5Lz1G/j15SlBbp+k36tuC1NGRdVEO27a4BKkRm7r7oW0wEObH8EGABGiMIvNzVLeQAAAABJRU5ErkJggg==" alt="">
		<img src="big.png" alt="">
...
```


### License

MIT © liyang
