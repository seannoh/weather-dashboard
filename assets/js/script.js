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
  var currLat = "";
  var currLong = "";
  var citiesList = [];

  // Function Definitions --------------------------------------------------

    // load storage
    function loadStorage() {
      previousCities = localStorage.getItem("previous-cities") ? JSON.parse(localStorage.getItem("previous-cities")) : [];
    }


    // Display current weather data
    function displayWeatherData() {
      var iconURL = "https://openweathermap.org/img/wn/";
      var temperature;
      var humidity;
      var windSpeed;
      var UVIndex;

      $.ajax({
        //url: "https://api.openweathermap.org/data/3.0/onecall?lat=" + currLat.toString() + "&lon=" + currLong.toString() + "&exclude=minutely,hourly,daily,alerts&appid=af9bef06aad138cfc1edc2c4a812ee06",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${currLat}&lon=${currLong}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=af9bef06aad138cfc1edc2c4a812ee06`,
        method: "GET"
      })
      .fail(function( jqXHR) {
        console.log( "Request failed: " + jqXHR.responseJSON.message);
      })
      .done(function(response) {
      
        /* add city to list */

        /* update local storage */

        /* display previous searches*/


        console.log(response);

        temperature = response.current.temp;
        humidity = response.current.humidity;
        windSpeed = response.current.wind_speed;
        UVIndex = response.current.uvi;
        iconURL += response.current.weather[0].icon;


        /* Clear section */
        /* Construct heading */
          // add weather icon
        /* Construct temperature*/
        /* Construct humidity */
        /* Construct windspeed */
        /* create uv index element */
          /* color correctly */
          /* append */

        /* Call to display forecast */ 
        displayForecast();       
        


      });
    }

    function displayForecast() {
      /* Clear section */

      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + currLat + "&lon=" + currLong + "&units=imperial&appid=af9bef06aad138cfc1edc2c4a812ee06",
        method: "GET"
      })
      .fail(function( jqXHR) {
        console.log( "Request failed: " + jqXHR.responseJSON.message);
      })
      .done(function(response) {
        console.log(response);
        /* Construct title */

        /* Iteratively create forecast cards */




      });
    }

    // display previous searches
    function displayPreviousSearches() {
      //stub

      /* Clear section */

      /* Iteratively create button elements */

    }

    // add search to list of previous searches
    function addToPreviousSearches(city) {
      //stub

      /* Check if it's already in the list */
        /* Add to list with title casing */
    }

    
    // search for city upon submit
      // display weather data
    function searchCity(e) {
      e.preventDefault();
      if(!searchInputEl.val().trim()) return;
      var cityArr = searchInputEl.val().split(", ");
      var cityName = cityArr[0];
      var countryCode = cityArr[2] || "";
      var url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&namePrefix=" + cityName + "&sort=-population&types=CITY";
      url += (countryCode) ? "&countryIds=" + countryCode : "";
      $.ajax({
          "url": url,
          "method": "GET",
          "headers": {
            "X-RapidAPI-Key": "1fe342bc6amsh07f8aebea06c74bp1eff28jsn0000b1fbcb43",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
          }
      })
      .fail(function( jqXHR) {
        console.log( "Request failed: " + jqXHR.responseJSON.message);
      })
      .done(function(response) {
        console.log(response);
        currLat = response.data[0].latitude;
        currLong = response.data[0].longitude;
        currCity = response.data[0].city;
        console.log(response);
        displayWeatherData();
      });
    }

    // handle previous search clicks
    function handlePreviousSearchBtns() {
      //stub

      // display weather for previous search

        /* set currCity */
        /* call displayWeatherData */

      // remove search from list of previous searches

        /* remove element from DOM */
        /* search for and remove corresponding element in cities list */
        /* update previousCities */

    }
      

  // Function Calls ----------------------------------------------------------
    loadStorage();


  // Event Listeners ---------------------------------------------------------

    // event listener for search button - search for city
    searchBtnEl.on("click",searchCity);

    // event listener for previous searches - handle previous search clicks
    previousSearchesEl.on("click",handlePreviousSearchBtns);

    // autocomplete for search input
    searchInputEl.autocomplete({
      source: citiesList,
      minLength: 3,
      delay: 1000
    });


});