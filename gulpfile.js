const {src, dest, watch} = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');

function compileCSS() {
  return src('./src/css/styles.css')
    .pipe(postcss([
      postcssImport()
    ]))
    .pipe(dest('./build/css/'));
}

function watchFiles(cb) {
  watch('./src/css/**/*.css', compileCSS);
  cb();
}

exports.compileCSS = compileCSS;
exports.watchFiles = watchFiles;
exports.default = watchFiles;