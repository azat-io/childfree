var browserSync = require('browser-sync').create();
var clearFix = require('postcss-clearfix');
var colorShort = require('postcss-color-short');
var cssMqpacker = require('css-mqpacker');
var cssNano = require('cssnano');
var cssNext = require('postcss-cssnext');
var focus = require('postcss-focus');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var precss = require('precss');
var propertySorter = require('css-property-sorter');
var px2Rem = require('postcss-pxtorem');
var size = require('postcss-size');
var short = require ('postcss-short');
var watch = require('gulp-watch');

gulp.task('default', ['server'], function() {
  gulp.watch('dist/*.html', function(event) {
    gulp.run('postcss');
  });
});

gulp.task('postcss', function () {
  var processors = [
    colorShort,
    focus,
    precss,
    short,
    size,
    clearFix,
    px2Rem,
    cssNext,
    cssMqpacker,
    propertySorter,
    cssNano
  ];
  return gulp.src('src/css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
    open: false
  });
});
