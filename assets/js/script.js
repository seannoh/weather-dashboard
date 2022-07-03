$(function() {
  // DOM Selectors
  var searchInputEl = $("#search-input");
  var searchBtnEl = $("#search-btn");
  var previousSearchesEl = $("#previous-searches");
  var currentWeatherEl = $("#current-weather");
  var weatherForecastEl = $("#weather-forecast")

  // Variables
  var previousCities = [];
  var currCity = "";
  var currLat = "";
  var currLong = "";

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
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${currLat}&lon=${currLong}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${APIKEY}`,
        method: "GET"
      })
      .fail(function( jqXHR) {
        alert( "Request failed: " + jqXHR.responseJSON.message);
      })
      .done(function(response) {
      
        /* add city to list */
        addToPreviousSearches(currCity);

        /* update local storage */
        localStorage.setItem("previous-cities",JSON.stringify(previousCities));

        /* display previous searches*/
        displayPreviousSearches();


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
        url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + currLat + "&lon=" + currLong + "&units=imperial&appid=" + APIKEY,
        method: "GET"
      })
      .fail(function( jqXHR) {
        alert( "Request failed: " + jqXHR.responseJSON.message);
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
      currCity = searchInputEl.val().trim().replace(/\s*,\s*/,',');
      console.log(currCity);
      $.ajax({
          "url": `http://api.openweathermap.org/geo/1.0/direct?q=${currCity}&limit=1&appid=${APIKEY}`,
          "method": "GET",
      })
      .fail(function( jqXHR) {
        alert( "Request failed: " + jqXHR.responseJSON.message);
      })
      .done(function(response) {
        console.log(response);

        if(response.length == 0){
          var errorMsgEl = $("<h2>");
          errorMsgEl.text("Couldn't find that city! :(");
          errorMsgEl.addClass("jumbotron-fluid");
          currentWeatherEl.append(errorMsgEl);
          return;
        }
        currLat = response[0].lat;
        currLong = response[0].lon;
        currCity = response[0].name;
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
    });


});