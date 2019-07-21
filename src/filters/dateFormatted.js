module.exports = function(value) {
  let dateObject = new Date(value);
  return dateObject.toLocaleString('en-us', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}