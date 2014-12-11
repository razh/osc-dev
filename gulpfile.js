'use strict';

var PORT = process.env.PORT || 3000;

var _ = require('lodash');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var watchify = require('watchify');
var to5Browserify = require('6to5-browserify');
var del = require('del');
var source = require('vinyl-source-stream');

var gulp = require('gulp');
var util = require('gulp-util');

function onError(error) {
  util.log('Error: ' + error.message);
  /*jshint validthis:true*/
  this.emit('end');
}

gulp.task('browser-sync', function() {
  return browserSync({
    browser: [],
    port: PORT,
    server: {
      baseDir: './'
    }
  });
});

gulp.task('js', function() {
  var bundler = watchify(browserify('./app/js/main.js',
    _.assign({
      debug: true,
      extensions: ['.jsx']
    }, watchify.args)));

  bundler.transform(to5Browserify.configure({
    modules: 'commonInterop'
  }));

  function rebundle() {
    return bundler.bundle()
      .on('error', onError)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true, once: true}));
  }

  bundler
    .on('log', util.log)
    .on('update', rebundle);

  return rebundle();
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('default', ['js', 'browser-sync']);
