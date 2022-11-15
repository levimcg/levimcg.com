const { DateTime } = require('luxon')
const markdownIt = require('markdown-it')

module.exports = {
  datetimeFormat: function(date) {
    return DateTime.fromJSDate(date).toISO()
  },
  dateFormatted: function(date) {
    return DateTime.fromJSDate(date).toFormat("LLL dd',' yyyy")
  },
  markdownify: function(content) {
    const md = new markdownIt({ html: true })
    return md.render(content)
  }
}