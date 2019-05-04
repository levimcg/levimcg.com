const CleanCSS = require('clean-css');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {
  // Markdown
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  
  eleventyConfig.setLibrary('md', markdownIt(options));
  
  // Syntax highlighting
  
  // NOTE: this plugin is stripping new line/br tags in HTML output.
  eleventyConfig.addPlugin(syntaxHighlight);

  // RSS feed
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter('cssmin', code => new CleanCSS({}).minify(code).styles);

  eleventyConfig.addFilter('dateFormatted', value => {
    let dateObject = new Date(value);

    return dateObject.toLocaleString('en-us', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  });
  
  eleventyConfig.addFilter('getYear', value => {
    let dateObject = new Date(value)
    return dateObject.getFullYear();
  });
  
  eleventyConfig.addCollection('sortedBooks', collection => {
    const allBooks = collection.getFilteredByGlob('**/books/*.md');
    const bookYears =
      allBooks.map(item => item.date.getFullYear());
    
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
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/favicon.png');

  return {
    dir: {
      input: 'src',
      output: 'build'
    }
  };
};
