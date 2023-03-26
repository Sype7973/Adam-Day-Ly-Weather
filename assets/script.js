var searchButtonEl = $('#search-Btn');
var weatherforecastResults = $('#weather-forecast');
var cityTitle = $('#city-heading');
var cityWeather =$('city-weather')
var searchedCityHistory = [];

var today = dayjs();
$('#currentDay').text(today.format('MMM D, YYYY, HH:mm:ss A'));


function updateTime() {
  setTimeout(updateTime, 1000);
  today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY, HH:mm:ss A'))
}

updateTime();


// function for search form click
$(searchButtonEl).click(function(event) {
  event.preventDefault();
  var query = $('#weather-Search').val();
// creates if statement to check if search field is empty
  if (!query) {
    alert('Sorry, You need a real city!');
    return;
  }
  searchedCityHistory.push(query)
  localStorage.setItem("City", JSON.stringify(searchedCityHistory));
  getWeather(query);
});

  // create function to take search parameters for city and replace api fetch url - can I splice the original fetch from line 1 or should i create own fetch inside function?
function getWeather(query){

  var searchedCityApi = 'https://api.openweathermap.org/data/2.5/forecast?q=';

  searchedCityApi = searchedCityApi + query + "&appid=65c9e335223e8ff274ce2918fe07a557";

  fetch(searchedCityApi)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
}

function loadSearchHistory(){
  searchedCityHistory = JSON.parse(localStorage.getItem('City')) || [];
  
}
loadSearchHistory();


//function to create memory button for each saved local storage param


// render results and add elements based on weather condition


// function renderWeather(weatherDailyForecast)

//   var resultCard = document.createElement('div');

//   var resultBody = document.createElement('div');
//   resultCard.append(resultBody);

//   var titleEl = document.createElement('h3');
//   titleEl.textContent = weatherDailyForecast.title;

// // need to create a function for the main card, targeting Bulma ids: city-heading, city-weather, weather-forecast

// var startDate = dayjs().add(1, 'day').startOf('day').unix();

// var endDate = dayjs().add(6, 'day').startOf('day').unix();

// if (weatherDailyForecast[i].dt >= startDate && weatherDailyForecast[i].dt <endDate){

// if (weatherDailyForecast[i].dt_txt.slice(11, 13) == "12") {

//  renderWeather(weatherDailyForecast[i]);

// }
// }
// }
