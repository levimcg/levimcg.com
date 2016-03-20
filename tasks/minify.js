var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

/*
**  Minification
*/

// Minfy CSS Task
gulp.task('cssProd', function() {
    return gulp.src('_build/css/style.css')
        .pipe(minifyCSS('_build/css/style.css'))
        .pipe(gulp.dest('_build/css'));
});

// Minfy JS Task
gulp.task('jsProd', function() {
    return  gulp.src('_build/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('_build/js/'));
});
