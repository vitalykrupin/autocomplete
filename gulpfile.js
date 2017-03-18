'use strict';

const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const connect = require('gulp-connect');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');

gulp.task('server', function() {
  connect.server({
    root: ['./'],
    port: process.env.NODE_PORT || 9999
  });
});

function watch (type) {
  return function () {
    gulp.watch(
      [
        './frontend/templates/**',
        './frontend/js/**',
        './frontend/styles/**'
      ],
      [type + '-build']);
  };
}

function build (type) {
  return function () {
    browserify({
        entries: './frontend/js/' + type + '.js',
        debug: true
    })
    .transform('babelify', {
        presets: ['es2015'],
        plugins: ['transform-class-properties']
    })
    .bundle()
    .on('error', function(err){
      gutil.log(gutil.colors.red.bold('[browserify error]'));
      gutil.log(err.message);
      this.emit('end');
    })
    .pipe(source(type + '.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));

    gulp.src(['./frontend/templates/' + type + '.jade'])
      .pipe(jade())
      .pipe(gulp.dest('./'));

    gulp.src(['./frontend/styles/' + type + '.sass'])
      .pipe(sass().on('error', sass.logError))
      .pipe(sass({includePaths: ['./*']}))
      .pipe(autoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ios 6', 'android 4'],
        cascade: false
      }))
      .pipe(cleanCSS({compatibility: 'ie9'}))
      .pipe(gulp.dest('./css/'))
    };
}

function createTasks (type) {
  gulp.task(type + '-watch', watch(type));
  gulp.task(type + '-build', build(type));
  gulp.task(type, [type + '-build', type + '-watch', 'server']);
}

createTasks('index');
