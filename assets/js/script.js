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
  var currDisplayName = "";
  var currLat = "";
  var currLong = "";

  // Function Definitions --------------------------------------------------

    // load storage
    function loadStorage() {
      previousCities = localStorage.getItem("previous-cities") ? JSON.parse(localStorage.getItem("previous-cities")) : [];
      displayPreviousSearches();
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

        /* Get data */
        temperature = response.current.temp;
        humidity = response.current.humidity;
        windSpeed = response.current.wind_speed;
        UVIndex = response.current.uvi;
        iconURL += response.current.weather[0].icon + "@2x.png";

        /* Clear section */
        currentWeatherEl.empty();

        /* Construct heading */
        var headingEl = $("<h1>");
        headingEl.addClass("row m-0 p-3 align-items-center");
        var date = moment().format("MMMM Do, YYYY");
        headingEl.text(`${currCity} (${date})`);
        // add weather icon
        var imgEl = $("<img>");
        imgEl.attr("src",iconURL);
        headingEl.append(imgEl);
        currentWeatherEl.append(headingEl);
        var hrEl = $("<hr>");
        hrEl.addClass("w-100");
        currentWeatherEl.append(hrEl);

        /* Construct coords */
        var coordsEl = $("<p>");
        coordsEl.text(`(Lat, Long): (${currLat}, ${currLong})`);

        /* Construct temperature*/
        var tempEl = $("<p>");
        tempEl.text("Temperature: " + temperature);

        /* Construct humidity */
        var humidEl = $("<p>");
        humidEl.text("Humidity: " + humidity);
        
        /* Construct windspeed */
        var windSpeedEl = $("<p>");
        windSpeedEl.text("Wind Speed: " + windSpeed);

        /* create uv index element */
        var UVEl = $("<p>");
        UVEl.text("UV Index: ");
        var UVIEl = $("<span>");
        UVIEl.text(UVIndex);
        UVIEl.addClass("p-2 rounded-lg");
        /* color correctly */
        var bkgdColor = "";
        if(UVIndex < 3){
          bkgdColor = "green";
        }else if(UVIndex < 6){
          bkgdColor = "yellow";
        }else if(UVIndex < 8){
          bkgdColor = "orange";
        }else if(UVIndex < 11){
          bkgdColor = "red";
        }else if(UVIndex >= 11){
          bkgdColor = "purple";
        }else{
          bkgdColor = "white";
        }
        UVIEl.attr("style",`background-color: ${bkgdColor}`);
          /* append */
        UVEl.append(UVIEl);

        currentWeatherEl.append(coordsEl,tempEl,humidEl,windSpeedEl,UVEl);

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
      previousSearchesEl.empty();

      /* Iteratively create button elements */
      for(var i = 0; i < previousCities.length; i++) {
        var liEl = $("<li>");
        liEl.addClass("btn border p-1 m-1");
        var btnEl = $("<div>");
        btnEl.addClass("btn btn-outline-secondary border-0 p-1");
        btnEl.text(previousCities[i]);
        var deletebtnEl = $("<div>");
        deletebtnEl.addClass("btn btn-outline-secondary border-0 p-1");
        deletebtnEl.html("&times;");
        liEl.append(btnEl,deletebtnEl);
        previousSearchesEl.append(liEl);
      }

    }

    // add search to list of previous searches
    function addToPreviousSearches(city) {
      /* Check if it's already in the list */
      if(!previousCities.includes(city)){
        previousCities.push(city);
      }
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