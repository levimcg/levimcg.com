var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

// Include everything in the "tasks" folder
requireDir('./tasks');

/*
**  Frequent Tasks
*/

// Build for staging site
gulp.task('stage', function(cb) {
    runSequence('jekyllStage', 'sass', 'prefix', 'cssProd', 'jsProd', cb);
});

// Build and deploy to staging site
gulp.task('dryRun', function(cb) {
    runSequence('stage', 'deployStage');
});

// Build for production
gulp.task('build', function(cb) {
    runSequence('jekyllProd', 'sass', 'prefix', 'cssProd', 'jsProd', cb);
});

// Build and deploy for production
gulp.task('ship', function(cb) {
    runSequence('build', 'deployProd');
});

// Default dev task
gulp.task('default', ['jekyllWatch', 'sass', 'sass:watch', 'reload']);
