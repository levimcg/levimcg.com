var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');

/**
 *  Jekyll Tasks
 */

// Build the Jeyll site for production
gulp.task('jekyllBuild', shell.task([
    'jekyll build'
]));

//Jekyll and watch and rebuild
gulp.task('jekyllWatch', shell.task([
    'jekyll build --watch --drafts'
]));

// Clean the _build folder
gulp.task('jekyllClean', function() {
    del('_build/**/*', '!_build/img')
});

// Build the Jeyll site for production
gulp.task('jekyllProd', shell.task([
    'jekyll build --config _config.yml'
]));

// Build the Jeyll site for staging
gulp.task('jekyllStage', shell.task([
    'jekyll build --config _config.yml,_config-stage.yml'
]));
