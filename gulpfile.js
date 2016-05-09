var gulp = require('gulp');
var cssmin = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('default',function() {
	gulp.run('js');
	gulp.run('style');
});
gulp.task('style', function() {
	gulp.src([
		'assets/css/*.css'
	])
	.pipe(cssmin())
	.pipe(gulp.dest('assets/vendor/css'));
});
gulp.task('js', function() {
	gulp.src([
		'assets/js/core.js',
	])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/vendor/js'));
	gulp.src([
		'assets/js/prism.js',
	])
	.pipe(gulp.dest('assets/vendor/js'));
});