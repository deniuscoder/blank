var gulp = require('gulp');
var server = require('gulp-server-livereload');
//var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

// server
gulp.task('start', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

// styles
gulp.task('style', function () {
  return gulp.src('app/sass/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'));
});

// watch style sass
gulp.task('watch', function(){
  gulp.watch('app/sass/**/*.css', ['style']);
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