// 11ty plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');

// Import filters
const dateFormatted = require('./src/filters/dateFormatted');
const cssmin = require('./src/filters/cssmin');
const getYear = require('./src/filters/getYear');

module.exports = function(eleventyConfig) {
  // Plugins
  // NOTE: this plugin is stripping new line/br tags in HTML output.
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  
  // Filters
  eleventyConfig.addFilter('cssmin', cssmin);
  eleventyConfig.addFilter('dateFormatted', dateFormatted);
  eleventyConfig.addFilter('getYear', getYear);
  eleventyConfig.addFilter('consoleDump', contents => {
    console.log(contents);
  })
  
  eleventyConfig.addCollection('sortedBooks', collection => {
    const allBooks = collection.getFilteredByGlob('**/books/*.md');
    const bookYears = allBooks.map(item => item.date.getFullYear());
    // Return a deduped array of sorted books using Set
    return [...new Set(bookYears)];
  });
  
  eleventyConfig.addCollection('latestPosts', collection => {
    return collection
      .getFilteredByGlob('**/posts/*.md')
      .slice(-5)
      .reverse();
  });

  eleventyConfig.addCollection('books', collection => {
    return collection
      .getFilteredByGlob('**/books/*.md');
  });

  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/favicon.png');

  eleventyConfig.addWatchTarget('./src/css/');

  return {
    dir: {
      input: 'src',
      output: 'build'
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
