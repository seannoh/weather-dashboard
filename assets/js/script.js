$(function() {
  // DOM Selectors
  var searchInputEl = $("#search-input");
  var searchBtnEl = $("#search-btn");
  var previousSearchesEl = $("#previous-searches");
  var currentWeatherEl = $("#current-weather");
  var weatherForecastEl = $("#weather-forecast")

  // Variables
  var previousCities = []
  var currCity = "";
  var currLat;
  var currLong;
  var citiesList = [];

  // Function Definitions

    // load storage
    function loadStorage() {
      previousCities = localStorage.getItem("previous-cities") ? JSON.parse(localStorage.getItem("previous-cities")) : [];
    }


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
    searchInputEl.autocomplete({
      source: function( request, response ) {
        $.ajax( {
          "async": true,
          "crossDomain": true,
          "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=" + searchInputEl.val() + "&sort=-population&types=CITY",
          "method": "GET",
          "headers": {
            "X-RapidAPI-Key": "1fe342bc6amsh07f8aebea06c74bp1eff28jsn0000b1fbcb43",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
          },
          success: function( data ) {
            citiesList = [];
            for(var i of data.data){
              citiesList.push(i.city + ", " + i.regionCode + ", " + i.countryCode);
            }
            response( citiesList );
          },
        } );
      },
      minLength: 3,
    } )


});