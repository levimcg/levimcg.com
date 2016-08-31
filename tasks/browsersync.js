var gulp = require('gulp');
var browserSync = require('browser-sync');
/*
**  Browsersync Tasks
*/

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: '_build'
        },
        open: false
    });
});

// Watch _build folder for changes and reload
gulp.task('reload', ['browserSync'], function() {
    gulp.watch(['_build/**/*.html', '_build/**/*.css', '_build/**/*.js']).on('change', browserSync.reload);
});
