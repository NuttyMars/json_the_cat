const request = require('request');

const fetchBreedDescription = function(breedName, callback) {

  request(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, (err,resp,body) => {

  if(err) {
    //if there is something misspelled
    if (err.code === 'ENOTFOUND') {
      return callback('Your search cannot be run. Check your spellig and try again!', null);
    } else {
      return callback(err, null);
    }
  }

  if (resp.statusCode !== 200) {
    return callback(`Something went wrong!\n${resp.statusMessage}`, null);
  }

  //the API returns a JSON array for the body
  const catDataArray = JSON.parse(body);
  //when the breed cannot be found the array is empty
  if (catDataArray.length === 0) {
    return callback('The breed you are looking for was not found. Try another search!', null);
  } else {
    const catObj = catDataArray[0];
    return callback(null, catObj.description)
  }
  });

}
  


module.exports = { fetchBreedDescription };