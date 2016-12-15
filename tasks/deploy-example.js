var gulp = require('gulp');
var rsync = require('gulp-rsync');

/**
 *  Deployment Tasks
 *
 *  Set up all your deployment paths here in these
 *  variables. It's a little cleaner.
 */

var deployHost = 'example.com';
var deployUser = 'username';
var deployPath = '/home1/path/to/site'

// Deploy Task
gulp.task('deploy', function() {
    return gulp.src('_build/**')
    .pipe(rsync({
        root: '_build',
        hostname: deployHost,
        username: deployUser,
        destination: deployPath,
        recursive: true,
        exclude: [
            'files',
            'to',
            'exlcude'
        ],
        /** BE CAREFUL! "clean: true" will keep everything synced but will delete
         * anything not in the 'exclude' array above.
         */
        clean: true,
        compress: true,
        incremental: true
    }));
});
