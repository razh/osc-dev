'use strict';

var browserSync = require('browser-sync');
var browserify = require('browserify');
var watchify = require('watchify');
var del = require('del');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source =  require('vinyl-source-stream');

var gulp = require('gulp');
var util = require('gulp-util');

function onError(error) {
  util.log('Error: ' + error.message);
  /*jshint validthis:true*/
  this.emit('end');
}

gulp.task('browser-sync', function() {
  return browserSync({
    server: {
      baseDir: './'
    }
  });
});


gulp.task('js', function() {
  var bundler = watchify(browserify(es6ify.runtime,
    Object.assign({
      debug: true,
      extensions: ['.jsx']
    }, watchify.args)));

  bundler
    .add('./app/js/main.js')
    .transform(reactify)
    .transform(es6ify.configure(/.(js|jsx)/));

  function rebundle() {
    return bundler.bundle()
      .on('error', onError)
      .pipe(source('main.js'))
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