module.exports = {
  layout: 'layouts/post.njk',
  tags: 'post',
  permalink: 'blog/{{ title | slugify }}/',
  backLink: {
    url: '/blog/',
    text: 'Blog'
  },
  marker: {
    variant: 'primary'
  }
}