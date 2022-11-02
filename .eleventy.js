const Image = require('@11ty/eleventy-img')
const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight')
const rssPlugin = require('@11ty/eleventy-plugin-rss')
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const { EleventyRenderPlugin } = require("@11ty/eleventy")
const figure = require('./src/shortcodes/figure')
const articleHero = require('./src/shortcodes/article-hero')
const feature = require('./src/shortcodes/feature')
const dateFormatted = require('./src/filters/dateFormatted')
const _ = require('lodash')
const htmlMinifier = require('html-minifier')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

// Shortcodes
async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [420, 780, 1280],
    formats: ["webp", "jpeg"],
    outputDir: './build/img/'
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline'
  });
}

module.exports = function(eleventyConfig) {

  // Shortcodes

  eleventyConfig.addShortcode('figure', figure)
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)
  eleventyConfig.addPairedShortcode('hero', articleHero)
  eleventyConfig.addPairedShortcode('feature', feature)


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

  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Filters

  const md = new markdownIt({
    html: true
  })

  eleventyConfig.addFilter('markdownify', content => {
    return md.render(content)
  })
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
  })
    .disable('code')
    .use(markdownItAnchor, {
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
