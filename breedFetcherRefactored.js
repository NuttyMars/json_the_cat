const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  
  request(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, (err,resp,body) => {
  
    if (err) {

      //if there is something misspelled
      if (err.code === 'ENOTFOUND') {
        callback('Your search cannot be run. Check your spellig and try again!', null);
      }
  
    } else {
      //parse body to make it an object
      const data = JSON.parse(body);
      
      //extract first element of array in order to access the description
      const catObj = data[0];
  
      //when the breen cannot be found the API returns an empty array for the body
      if (data.length === 0) {
        callback(null, 'The breed you are looking for was not found. Try another search!');

      } else {
        callback(null, catObj.description);
      }
    }
  });
};

module.exports = { fetchBreedDescription };