var searchButtonEl = $('#search-Btn');
var weatherforecastResults = $('#weather-forecast');
var cityTitle = $('#city-heading');
var cityWeather =$('city-weather')

var today = dayjs();
$('#currentDay').text(today.format('MMM D, YYYY, HH:mm:ss A'));


function updateTime() {
  setTimeout(updateTime, 1000);
  today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY, HH:mm:ss A'))
}

updateTime();

// var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Sydney&appid=65c9e335223e8ff274ce2918fe07a557'
// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('Fetch Response \n-------------');
//     console.log(data);
//   });

// function for search form click
$(searchButtonEl).click(function(event) {
  event.preventDefault();
  var weatherSearchEl = $('#weather-Search').val();
  console.log(weatherSearchEl);


  localStorage.setItem('City', weatherSearchEl);
// creates if statement to check if search field is empty
  // if (!weatherSearchEl) {
  //   console.error('Sorry, You need a real city!');
  //   return;
  // }
  getWeather();
});

  // create function to take search parameters for city and replace api fetch url - can I splice the original fetch from line 1 or should i create own fetch inside function?
function getWeather(query, format){

  var searchedCityApi = 'https://api.openweathermap.org/data/2.5/forecast?q=';

  if (format) {
    searchedCityApi = '?q=' + '&appid=65c9e335223e8ff274ce2918fe07a557';
  }

  searchedCityApi = searchedCityApi + query + "&appid=65c9e335223e8ff274ce2918fe07a557";

  fetch(searchedCityApi)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
  
}

  // function for search form enter
// function handleWeatherSearchSubmit(event) {
//   event.preventDefault();
// // creates variables for the search-input text space and format input dropdown
//   var weatherSearchEl = $('#weather-Search');
//   console.log(weatherSearchEl);
// // creates if statement to check if search field is empty
//   if (!weatherSearchEl) {
//     console.error('Sorry, You need a real city!');
//     return;
//   }
//   localStorage.setItem(weatherSearchEl);
// }

  //function to create memory button for each saved local storage param




// render results and add elements based on weather condition

// function renderWeatherforecast(resultObj) {

//   var cityResult = 'city name'

// cityTitle.append();
// cityWeather.append();
// weatherForecastResults.append();
// }