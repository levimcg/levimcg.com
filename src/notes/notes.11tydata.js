module.exports = {
  layout: 'layouts/post.njk',
  tags: 'note',
  permalink: 'notes/{{ title | slugify }}/'
}