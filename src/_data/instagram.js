const axios = require('axios');

require('dotenv').config();
const INSTAGRAM_AUTH = process.env.INSTAGRAM_AUTH;
const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${INSTAGRAM_AUTH}`;

module.exports = function() {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => resolve(response.data))
      .catch(err => {
        reject(err);
      });
  });
}