const htmlMinifier = require('html-minifier');

// 11ty plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

// Import filters
const dateFormatted = require('./src/filters/dateFormatted');

// Shortcodes
const figure = require('./src/shortcodes/figure');

module.exports = function(eleventyConfig) {

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
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  // Filters
  eleventyConfig.addFilter('dateFormatted', dateFormatted);

  // Files to watch and copy on change
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/favicon.png');
  
  // Rebuild site when CSS files change
  eleventyConfig.addWatchTarget('./src/scss/');

  // BrowserSync settings
  eleventyConfig.setBrowserSyncConfig({
    open: 'local'
  });
  
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
