const CleanCSS = require('clean-css');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function(eleventyConfig) {
  // Syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);

  // RSS feed
  eleventyConfig.addPlugin(pluginRss);

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

  eleventyConfig.addCollection('books', collection => {
    return collection.getFilteredByGlob('**/books/*.md');
  });

  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/favicon.png');

  return {
    dir: {
      input: 'src',
      output: 'build'
    }
  };
};
