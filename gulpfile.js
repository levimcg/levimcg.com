const gulp = require('gulp');
const runSequence = require('run-sequence');
const cp = require('child_process');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync');

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

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('./_build/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('css:minify', function () {
  return gulp.src('_build/css/style.css')
    .pipe(cssnano())
    .pipe(gulp.dest('_build/css/'));
});

gulp.task('css:prefix', function () {
  return gulp.src('_build/css/style.css')
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(gulp.dest('_build/css/'));
});

/**
 *  Browsersync Tasks
 */
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: '_build'
    }
  });

  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('_build/**/*.html').on('change', browserSync.reload);
});

gulp.task('build', function(done) {
  runSequence('compile', 'sass', 'css:prefix', 'css:minify', done);
});

gulp.task('deploy', function () {
  cp.exec('aws s3 sync _build/ s3://levimcg.com', function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
});

gulp.task('ship', function(done) {
  runSequence('build', 'deploy');
});

gulp.task('default', ['compile:watch', 'serve']);