var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Sydney&appid=65c9e335223e8ff274ce2918fe07a557'
var searchFormEl = $('#search-form');


fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
  });



  // function for search form
function handleWeatherSearchSubmit(event) {
  event.preventDefault();
// creates variables for the search-input text space and format input dropdown
  var weatherSearchEl = $('#weather-Search').value;
  console.log(weatherSearchEl);
// creates if statement to check if search field is empty
  if (!weatherSearchEl) {
    console.error('You need a search input value!');
    return;
  }
  // creates a variable for the search functionality by placing the above input into the API search parameter
  var queryString = 'forecast?q=' + weatherSearchEl;
}
// event listenter for the submit button to run function
searchFormEl.addEventListener('submit', handleWeatherSearchSubmit);


// take search parameters for city and replace api fetch url - can I splice the original fetch from line 1 or should i create own fetch inside function?


// save search into local storage


// create memory button for each saved local storage param