var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

// Include everything in the "tasks" folder
requireDir('./tasks');

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
