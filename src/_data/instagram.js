const axios = require('axios');
const fs = require('fs');

require('dotenv').config();
const INSTAGRAM_AUTH = process.env.INSTAGRAM_AUTH;
const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${INSTAGRAM_AUTH}`;

module.exports = function() {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        if(process.env.ELEVENTY_ENV == 'stub') {
          fs.writeFile(__dirname + '/instagram_dev.json', JSON.stringify(response.data), err => {
            if(err) {
              console.log(err);
            } else {
              console.log('Instagram data stubbed for development');
            }
          });
        } else {
          resolve(response.data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}