const htmlMinifier = require('html-minifier');

// 11ty plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

// Import filters
const dateFormatted = require('./src/filters/dateFormatted');
const cssmin = require('./src/filters/cssmin');
const getYear = require('./src/filters/getYear');

module.exports = function(eleventyConfig) {
  // HTML minification
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (
      outputPath &&
      outputPath.endsWith('.html') &&
      process.env.ELEVENTY_ENV == 'prod'
    ) {
      return htmlMinifier.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
    }
    return content;
  })
  
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
  });

  // Collections
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

  // Files to watch and copy on change
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/favicon.png');
  
  // Rebuild site when CSS files change
  eleventyConfig.addWatchTarget('./src/css/');
  
  // Configure markdown settings
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'mcg-anchor',
    permalinkSymbol: '#'
  });
  
  // Markdown settings for 11ty
  eleventyConfig.setLibrary('md', markdownLibrary);

  return {
    dir: {
      input: 'src',
      output: 'build'
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
