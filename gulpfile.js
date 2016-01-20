var browserSync = require('browser-sync').create();
var clearFix = require('postcss-clearfix');
var colorShort = require('postcss-color-short');
var cssMqpacker = require('css-mqpacker');
var cssNext = require('postcss-cssnext');
var focus = require('postcss-focus');
var gulp = require('gulp');
var atImport = require('postcss-import')
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var precss = require('precss');
var propertySorter = require('css-property-sorter');
var px2Rem = require('postcss-pxtorem');
var sass = require('gulp-sass');
var size = require('postcss-size');
var short = require ('postcss-short');
var watch = require('gulp-watch');
var uncss = require('gulp-uncss');

gulp.task('default', ['server'], function() {
  gulp.watch('src/css/*.css', function(event) {
    gulp.run('css');
  });
  gulp.watch('src/sass/*.scss', function(event) {
    gulp.run('sass');
  });
});

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css/assets/'));
});

gulp.task('css', function () {
  var processors = [
    atImport,
    colorShort,
    focus,
    precss,
    short,
    size,
    clearFix,
    px2Rem,
    cssNext,
    cssMqpacker,
    propertySorter
  ];
  return gulp.src('src/css/*.css')
    .pipe(postcss(processors))
    .pipe(uncss({
        html: ['dist/index.html']
    }))
    .pipe(nano())
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
