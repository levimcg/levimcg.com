/**
 * Linting CSS stylesheets with Stylelint
 * http://www.creativenightly.com/2016/02/How-to-lint-your-css-with-stylelint/
 */

var gulp        = require('gulp');
var postcss     = require('gulp-postcss');
var reporter    = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint   = require('stylelint');

gulp.task("scss-lint", function() {

  // Stylelint config rules
  var stylelintConfig = {
    "rules": {
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "function-comma-space-after": "always",
      "function-url-quotes": "double",
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-no-vendor-prefix": true,
      "max-empty-lines": 5,
      "number-leading-zero": "never",
      "number-no-trailing-zeros": true,
      "property-no-vendor-prefix": true,
      "block-no-single-line": true,
      "declaration-block-trailing-semicolon": "always",
      "selector-list-comma-space-before": "never",
      "selector-list-comma-newline-after": "always",
      "selector-no-id": true,
      "string-quotes": "double",
      "value-no-vendor-prefix": true
    }
  }

  var processors = [
    stylelint(stylelintConfig),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];

  return gulp.src(
      // Source:
      [
          'src/scss/**/*.scss',
          '!./src/scss/libs/**/*.scss',
          '!./src/scss/global/**/*.scss'
      ]
    )
    .pipe(postcss(processors), {syntax: syntax_scss});
});
