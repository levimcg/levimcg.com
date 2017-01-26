var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('./_build/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});
