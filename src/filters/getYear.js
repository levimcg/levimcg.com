module.exports = function(value) {
  let dateObject = new Date(value)
  return dateObject.getFullYear();
}