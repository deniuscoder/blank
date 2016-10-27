var gulp = require('gulp');
var server = require('gulp-server-livereload');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var image = require('gulp-image');

// server
gulp.task('start', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

// image
gulp.task('image', function () {
  gulp.src('app/images/*')
    .pipe(image())
    .pipe(gulp.dest('public/images'));
});

// styles
gulp.task('style', function () {
  return gulp.src('app/noprefix/*.css')
    .pipe(autoprefixer({
      browsers: ['last 15 versions']
    }))
    .pipe(gulp.dest('app/css'));
});

// watch for files
gulp.task('watch', function(){
  gulp.watch('app/noprefix/*.css', ['style']);
  gulp.watch('app/images/*', ['image']);
});

// default start
gulp.task('default', ['start', 'watch']);

// build
gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('public'));
});