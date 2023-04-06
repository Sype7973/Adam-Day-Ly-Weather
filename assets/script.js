let searchButtonEl = $('#search-Btn');
let weatherforecastResults = $('#weather-forecast');
let cityTitle = $('#city-heading');
let cityWeather =$('#city-weather')
let searchedCityHistory = [];
const apiKey = "65c9e335223e8ff274ce2918fe07a557";

// dayjs time function
let today = dayjs();
$('#currentDay').text(today.format('MMM D, YYYY, HH:mm:ss A'));

// clock function
function updateTime() {
  setTimeout(updateTime, 1000);
  today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY, HH:mm:ss A'))
}


// function for search form click
$(searchButtonEl).click(function(event) {
  event.preventDefault();
  let query = $('#weather-Search').val();
// creates if statement to check if search field is empty
  if (!query) {
    alert('Sorry, you need to put in a city name!');
    return;
  }
  getWeather(query);
});

  // function to get weather data from API
function getWeather(query){

  weatherforecastResults.html("");
  cityTitle.html("");

 
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + query + '&appid=' + apiKey,
    method: 'GET',
    dataType: 'json',
    success: function(data) {
     
        
      // Extract necessary data from API response
      if (data.cod === '404') {
        alert('City not found on OpenWeather API');
      } else {
        // Add city to array of searched cities in local storage
        searchedCityHistory.push(query);
        localStorage.setItem('City', JSON.stringify(searchedCityHistory));
      
        // Create elements for current day weather
        let today = data.list[0];
        let forecast = data.list.filter(function(item, index) {
          return (index + 1) % 8 === 0 // Keep only one forecast per day (every 8th item)
        });
      
        let currentTitle = $('<h2 class="title" id="weather-header">');
        currentTitle.text("Today's Current Weather in " + query);
        cityTitle.append(currentTitle);
        let titleWeatherCard = $('<div class="content" id="main-forecast-content">');
        let currentIcon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + today.weather[0].icon + '.png').addClass('weather-icon');
        titleWeatherCard.append(currentIcon);
        let currentTemp = $('<div>').text(Math.round(today.main.temp - 273.15) + '°C').addClass('weather-temp');
        titleWeatherCard.append(currentTemp);
        let currentDesc = $('<div>').text(today.weather[0].description).addClass('weather-desc');
        titleWeatherCard.append(currentDesc);
        let currentWind = $('<div>').text("Wind Speed: " + today.wind.speed + " m/s").addClass('weather-wind');
        titleWeatherCard.append(currentWind);
        cityTitle.append(titleWeatherCard);
      
        forecast.forEach(function(item) {
          let weatherCard = $('<div class="content" id="weather-forecast-content">');
          weatherforecastResults.append(weatherCard);
          let icon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png').addClass('weather-icon');
          weatherCard.append(icon);
          let date = $('<div>').text(dayjs(item.dt_txt).format('dddd')).addClass('weather-date');
          weatherCard.append(date);
          let temp = $('<div>').text(Math.round(item.main.temp - 273.15) + '°C').addClass('weather-temp');
          weatherCard.append(temp);
          let desc = $('<div>').text(item.weather[0].description).addClass('weather-desc');
          weatherCard.append(desc);
          let windSpeed = $('<div>').text("Wind Speed: " + item.wind.speed + " m/s").addClass('weather-wind');
          weatherCard.append(windSpeed);
        });
      
        loadSearchHistory();
      }
    }
  });
}
// function to load search history
function loadSearchHistory() {
  let searchedCityHistory = JSON.parse(localStorage.getItem('City')) || [];
  // Clear existing buttons
  $('#btn-memory').empty();
  // Render a button for each city in local storage and remove duplicates if any
  // 'set' operator removes duplicates by converting array to set and back to array
  // it will only keep unique values
  let uniqueCities = [...new Set(searchedCityHistory)]; 
  uniqueCities.forEach(function(city) {
    let button = $('<button>').addClass('city-button button column is-primary is-large are-medium is-responsive').text(city);
    $('#btn-memory').append(button);
  });
}
// Attach click event to each button to re-open its previous search
$('#btn-memory').on('click', function(event) {
  event.stopPropagation();
  console.log(event.target)
  let city = $(event.target).text();
  console.log(this);
  getWeather(city);
});


// clear search function
$('#clear-search').click(function(event) {
  event.stopPropagation();
  localStorage.clear();
  $('#btn-memory').empty();
  searchedCityHistory = [];
  weatherforecastResults.html("");
  cityTitle.html("");
});

updateTime();