module.exports = {
  layout: 'layouts/post.njk',
  tags: 'post',
  permalink: 'blog/{{ title | slugify }}/'
}