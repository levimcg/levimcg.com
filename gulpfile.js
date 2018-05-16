var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

// Include everything in the "tasks" folder
requireDir('./tasks');

const cp = require('child_process');
const gutil = require('gulp-util');

gulp.task('compile', function(callback) {
  cp.exec('jekyll build', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

gulp.task('compile:watch', function() {
  const jekyll = cp.spawn('jekyll', ['build', '--watch']);

  const jekyllLogger = function (buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

/*
**  Frequent Tasks
*/

// Build for production
gulp.task('build', function(cb) {
  runSequence('jekyllProd', 'sass', 'prefix', 'cssProd', 'jsProd', cb);
});

// Build and deploy for production
gulp.task('ship', function(cb) {
    runSequence('build', 'deploy');
});

// Default dev task
gulp.task('default', ['jekyllWatch', 'sass', 'sass:watch', 'reload']);
