module.exports = function(date) {
  const dateString = new Date(date).toLocaleString('en-US')
  return dateString.replace(/\//g, '-').slice(0, 10)
}