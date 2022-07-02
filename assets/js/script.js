$(function() {
  // DOM Selectors
  var searchInputEl = $("#search-input");
  var searchBtnEl = $("#search-btn");
  var previousSearchesEl = $("#previous-searches");
  var currentWeatherEl = $("#current-weather");
  var weatherForecastEl = $("#weather-forecast")

  // Variables
  var previousCities = localStorage.getItem("previous-cities") ? JSON.parse(localStorage.getItem("previous-cities")) : [];
  var currCity = "";
  var currLat;
  var currLong;
  var citiesList = [];

  // Function Definitions

    // load storage

    // load list of cities


    // display weather data
      // if successful, add city to list
      // update local storage
      // update previous searches display
      // render html


    // display previous searches

    // add search to list of previous searches

    
    // search for city upon submit
      // display weather data

    // handle previous search clicks
      // display weather for previous search

      // remove search from list of previous searches


  // Function Calls


  // Event Listeners

    // event listener for search button - search for city

    // event listener for previous searches - handle previous search clicks

    // autocomplete for search input



});