const CleanCSS = require('clean-css');

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter(
    'cssmin',
    code => new CleanCSS({}).minify(code).styles
  );

  eleventyConfig.addFilter('dateFormatted', value => {
    let dateObject = new Date(value);

    return dateObject.toLocaleString('en-us', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  });

  eleventyConfig.addCollection('latestPosts', collection => {
    return collection
      .getFilteredByGlob('**/posts/*.md')
      .slice(-5)
      .reverse();
  });

  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/js');

  return {
    dir: {
      input: 'src',
      output: 'build'
    }
  };
};
