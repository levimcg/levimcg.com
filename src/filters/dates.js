const { DateTime } = require('luxon')

module.exports = {
  datetimeFormat: function(date) {
    return DateTime.fromJSDate(date).toISO()
  },
  dateFormatted: function(date) {
    return DateTime.fromJSDate(date).toFormat("LLL dd',' yyyy")
  }
}