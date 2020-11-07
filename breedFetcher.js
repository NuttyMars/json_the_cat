const request = require('request');

//get the name of the cat
const catName = process.argv.slice(2).toString();
//could be done also: catName = process.argv[2] - there's only one arg passed in terminal
  
request(`https://api.thecatapi.com/v1/breeds/search?q=${catName}`, (err,resp,body) => {
  
  if (err) {
    //if there is something misspelled
    if (err.code === 'ENOTFOUND') {
      console.log('Your search cannot be run. Check your spellig and try again!');
    }

  } else {
    //parse body to make it an object
    const data = JSON.parse(body);
    
    //extract first element of array in order to access the description
    const catObj = data[0];

    //when the breen cannot be found the API returns an empty array for the body
    if (data.length === 0) {
      console.log('The breed you are looking for was not found. Try another search!');
    } else {
      console.log(catObj.description);
    }
  }
});