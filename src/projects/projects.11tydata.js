module.exports = {
  layout: 'layouts/project.njk',
  tags: 'project',
  permalink: 'projects/{{ title | slugify }}/'
}