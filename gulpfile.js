var gulp = require('gulp'),
	cssmin = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function () {
	gulp.watch('assets/css/*.css', ['css']);
	gulp.watch('assets/js/core.js', ['minjs']);
});
gulp.task('css', function() {
	gulp.src([
		'assets/css/*.css'
	])
	.pipe(autoprefixer({
		browsers: ['last 3 versions', 'Android >= 4.0', 'iOS >= 9.0'],
		cascade: true,
		remove: true
	}))
	.pipe(cssmin())
	.pipe(gulp.dest('assets/vendor/css'));
});
gulp.task('minjs', function() {
	gulp.src([
		'assets/js/core.js'
	])
    .pipe(uglify())
    .pipe(gulp.dest('assets/vendor/js'));
});