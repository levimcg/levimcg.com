const htmlMinifier = require('html-minifier');

// 11ty plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

// Import filters
const dateFormatted = require('./src/filters/dateFormatted');

// Shortcodes
const figure = require('./src/shortcodes/figure');

module.exports = function(eleventyConfig) {
  // Merge data E.g. tags on each .md file with directory data "tags" field
  eleventyConfig.setDataDeepMerge(true);

  // Shortcodes
  eleventyConfig.addShortcode('figure', figure);

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
  });
  
  // Plugins
  // NOTE: this plugin is stripping new line/br tags in HTML output.
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  
  // Filters
  eleventyConfig.addFilter('dateFormatted', dateFormatted);

  // Files to watch and copy on change
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/favicon.png');
  
  // Rebuild site when CSS files change
  eleventyConfig.addWatchTarget('./src/scss/');
  
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
