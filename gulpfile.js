var gulp = require('gulp');
var webserver = require('gulp-webserver');
var replace = require('gulp-replace');
 
gulp.task('build', function(done){
	gulp.src(['app.constants.js'])
	  .pipe(replace('{MOCKS_BACKEND_URL}', process.env.MOCKS_BACKEND_URL || 'http://localhost:8090'))
	  .pipe(replace('{MOCKS_DEFAULT_TIMEOUT}', process.env.MOCKS_DEFAULT_TIMEOUT || 20000))
	  .pipe(gulp.dest('app/'));
	done();
  });

gulp.task('webserver', function() {
	gulp.src('./')
		.pipe(webserver({
		  livereload: true,
		  host: '0.0.0.0',
		  directoryListing: false,
		  open: false,
		  port: process.env.MOCKS_FRONTEND_PORT || 8000
    }));
});

gulp.task('run', gulp.series('build', 'webserver'))