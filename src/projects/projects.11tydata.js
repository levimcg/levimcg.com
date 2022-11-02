module.exports = {
  layout: 'layouts/project.njk',
  tags: 'projects',
  backLink: {
    url: '/projects/',
    text: 'Projects'
  },
  marker: {
    variant: 'secondary'
  },
  permalink: 'projects/{{ title | slugify }}/'
}