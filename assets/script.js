let searchButtonEl = $('#search-Btn');
let weatherforecastResults = $('#weather-forecast');
let cityTitle = $('#city-heading');
let cityWeather =$('#city-weather')
let searchedCityHistory = [];

let today = dayjs();
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
  let query = $('#weather-Search').val();
// creates if statement to check if search field is empty
  if (!query) {
    alert('Sorry, You need a real city!');
    return;
  }
  searchedCityHistory.push(query)
  localStorage.setItem("City", JSON.stringify(searchedCityHistory));
  getWeather(query);
  loadSearchHistory();
});

  // create function to take search parameters for city and replace api fetch url - can I splice the original fetch from line 1 or should i create own fetch inside function?
function getWeather(query){

  weatherforecastResults.html("");
  cityTitle.html("");

  let apiKey = "65c9e335223e8ff274ce2918fe07a557";

  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + query + '&appid=' + apiKey,
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      // Extract necessary data from API response
      let today = data.list[0];
      let forecast = data.list.filter(function(item, index) {
        return index % 8 === 0; // Keep only one forecast per day (every 8th item)
      });

      // Create elements for current day weather
      let currentTitle = $('<h2 class = "title" id = weather-header>');
      currentTitle.text("Today's Weather in " + query);
      cityTitle.append(currentTitle);
      let currentIcon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + today.weather[0].icon + '.png').addClass('weather-icon');
      let currentTemp = $('<div>').text(Math.round(today.main.temp - 273.15) + '°C').addClass('weather-temp');
      let currentDesc = $('<div>').text(today.weather[0].description).addClass('weather-desc');

      cityTitle.append(currentIcon, currentTemp, currentDesc);

      // Create elements for next 5 days weather
      forecast.forEach(function(item) {
        let icon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png').addClass('weather-icon');
        let temp = $('<div>').text(Math.round(item.main.temp - 273.15) + '°C').addClass('weather-temp');
        let desc = $('<div>').text(item.weather[0].description).addClass('weather-desc');
        let date = $('<div>').text(dayjs(item.dt_txt).format('dddd')).addClass('weather-date');
        weatherforecastResults.append(date, icon, temp, desc);
      });
    },
    error: function(err) {
      console.log(err);
    }
});
}
function loadSearchHistory(){
  searchedCityHistory = JSON.parse(localStorage.getItem('City')) || [];
    // Clear existing buttons
    $('#btn-memory').empty();

    // Render a button for each city in local storage
    searchedCityHistory.forEach(function(city) {
      let button = $('<button>').addClass('city-button').text(city);
      $('#city-buttons').append(button);
    });
  
    // Attach click event to each button to re-open its previous search
    $('.button-memory').on('click', function() {
      let city = $(this).text();
      fetchWeather(city);
    });
}



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