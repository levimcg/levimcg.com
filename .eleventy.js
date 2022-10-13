const htmlMinifier = require('html-minifier')
const _ = require('lodash')

// 11ty plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

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

  // Collections

  // Creates a list of all tags
  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "notes", "projects"].indexOf(tag) === -1);
  }

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  })

  /**
   * This post was super helpful in figuring out how to sort this way
   * https://darekkay.com/blog/eleventy-group-posts-by-year/
   */
  eleventyConfig.addCollection('postsByYear', collection => {
    return _.chain(collection.getFilteredByTag('post'))
      .groupBy(post => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value()
  })

  // Files to watch and copy on change
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/favicon.png');
  eleventyConfig.addPassthroughCopy('src/icon.svg');
  eleventyConfig.addPassthroughCopy('src/_redirects');

  // BrowserSync settings
  eleventyConfig.setBrowserSyncConfig({
    open: 'local',
    files: ['build/css/styles.css']
  });

  // Configure markdown settings
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'heading-anchor',
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
