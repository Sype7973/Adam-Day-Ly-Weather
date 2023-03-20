var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Sydney&appid=65c9e335223e8ff274ce2918fe07a557'

var weatherSearchEl = $('#weatherSearch');


fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
  });




  // function for search form


// function handleWeatherSearchSubmit(event) {
//   event.preventDefault();
// // creates variables for the search-input text space and format input dropdown
//   var searchInputVal = document.querySelector('#search-input').value;
//   var formatInputVal = document.querySelector('#format-input').value;
// // creates if statement to check if search field is empty
//   if (!searchInputVal) {
//     console.error('You need a search input value!');
//     return;
//   }
//   // creates a variable for the search functionality by placing the above input into the API search parameter
//   var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;
//   // changes location to the variable above with the url of the searched input
//   location.assign(queryString);
// }
// // event listenter for the submit button to run function
// searchFormEl.addEventListener('submit', handleSearchFormSubmit);