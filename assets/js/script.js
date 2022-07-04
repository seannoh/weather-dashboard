$(function() {
  // DOM Selectors
  var searchInputEl = $("#search-input");
  var searchBtnEl = $("#search-btn");
  var previousSearchesEl = $("#previous-searches");
  var currentWeatherEl = $("#current-weather");
  var weatherForecastEl = $("#weather-forecast")

  // Variables
  var previousCities = [];
  var currCity = {
    cityName: "",
    currLat: "",
    currLong: ""
  }

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
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${currCity.currLat}&lon=${currCity.currLong}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKEY}`,
        method: "GET"
      })
      .fail(function( jqXHR) {
        alert( "Request failed: " + jqXHR.responseJSON.message);
      })
      .done(function(response) {
      
        /* add city to list */
        addToPreviousSearches(JSON.stringify(currCity));

        /* update local storage */
        localStorage.setItem("previous-cities",JSON.stringify(previousCities));

        /* display previous searches*/
        displayPreviousSearches();

        /* Get data */
        temperature = response.current.temp;
        humidity = response.current.humidity;
        windSpeed = response.current.wind_speed;
        UVIndex = response.current.uvi;

        /* Clear section */
        currentWeatherEl.empty();

        /* Construct heading */
        var headingEl = $("<h1>");
        headingEl.addClass("row m-0 p-3 align-items-center");
        var date = moment(moment.unix(response.current.dt + response.timezone_offset).utc()).format("MMMM Do, YYYY | h:mm A");
        headingEl.text(`${currCity.cityName} (${date})`);
        // add weather icon
        var imgEl = $("<img>");
        imgEl.attr("src",iconURL + response.current.weather[0].icon + "@2x.png");
        headingEl.append(imgEl);
        currentWeatherEl.append(headingEl);
        var hrEl = $("<hr>");
        hrEl.addClass("w-100");
        currentWeatherEl.append(hrEl);

        /* Construct coords */
        var coordsEl = $("<p>");
        coordsEl.text(`(Lat, Long): (${currCity.currLat}, ${currCity.currLong})`);

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

   

        // Clear weather forecast
        weatherForecastEl.empty();
        /* Construct title */
        var headingEl = $("<h2>").addClass("row justify-content-center");
        headingEl.text("5 Day Forecast");
        weatherForecastEl.append(headingEl);

        var forecastRowEl = $("<div>");
        forecastRowEl.addClass("row");
        /* Iteratively create forecast cards */
        for(var i = 1; i < 6; i++){
          // Create card
          var cardEl = $("<div>").addClass("card w-auto bg-primary m-2 rounded text-white");
          var cardBodyEl = $("<div>").addClass("card-body");
          // Create title
          var cardHeadEl = $("<div>").addClass("card-title");
          cardHeadEl.text(moment(moment.unix(response.daily[i].dt)).format("dddd M/D/YY"));
          // Create icon
          var cardImgEl = $("<img>");
          cardImgEl.attr("src",iconURL + response.daily[i].weather[0].icon + ".png");
          // Construct temp
          var cardTempEl = $("<p>").addClass("card-text");
          cardTempEl.text("Temp: " + response.daily[i].temp.day);
          // Construct humidity
          var cardHumidEl = $("<p>").addClass("card-text");
          cardHumidEl.text("Humidity: " + response.daily[i].humidity);

          // append
          cardBodyEl.append(cardHeadEl,cardImgEl,cardTempEl,cardHumidEl);
          cardEl.append(cardBodyEl);
          forecastRowEl.append(cardEl);
        }

        weatherForecastEl.append(forecastRowEl);
      
      });
    }


    // display previous searches
    function displayPreviousSearches() {
      /* Clear section */
      previousSearchesEl.empty();

      /* Iteratively create button elements */
      for(var i = 0; i < previousCities.length; i++) {
        // Create li elements and two buttons
        var liEl = $("<li>").addClass("btn border p-1 m-1");
        var btnEl = $("<div>").addClass("btn btn-outline-secondary border-0 p-1 prev-search-btn");
        btnEl.text(previousCities[i].cityName);
        var deletebtnEl = $("<div>").addClass("btn btn-outline-secondary border-0 p-1 prev-search-del-btn");
        deletebtnEl.html("&times;");

        // append
        liEl.append(btnEl,deletebtnEl);
        previousSearchesEl.append(liEl);
      }

    }

    // add search to list of previous searches
    function addToPreviousSearches(stringyCity) {
      /* Check if it's already in the list */
      var city = JSON.parse(stringyCity);

      if (!(previousCities.some(function(e) {return (e.currLat == city.currLat) && (e.currLong == city.currLong)}))) {
        previousCities.push(city);
      }
    }

    
    // search for city upon submit
    function searchCity(e) {
      e.preventDefault();
      // check for empty input
      if(!searchInputEl.val().trim()) return;
      // trim whitespace
      currCity.cityName = searchInputEl.val().trim().replace(/\s*,\s*/,',');

      $.ajax({
          "url": `http://api.openweathermap.org/geo/1.0/direct?q=${currCity.cityName}&limit=1&appid=${APIKEY}`,
          "method": "GET",
      })
      .fail(function( jqXHR) {
        alert( "Request failed: " + jqXHR.responseJSON.message);
      })
      .done(function(response) {

        if(response.length == 0){
          currentWeatherEl.empty();
          var errorMsgEl = $("<h2>");
          errorMsgEl.text("Couldn't find the city \"" + searchInputEl.val() + "\" :(");
          errorMsgEl.addClass("jumbotron-fluid");
          currentWeatherEl.append(errorMsgEl);
          return;
        }
        currCity.currLat = response[0].lat;
        currCity.currLong = response[0].lon;
        currCity.cityName = response[0].name;
        displayWeatherData();
      });
    }
  
    // handle previous search clicks
    function handlePreviousSearchBtns() {
      var element = $(this);
      // display weather for previous search
      var elementIndex = element.parent().index();
      var cityInfo = previousCities[elementIndex];
      currCity.cityName = cityInfo.cityName;
      currCity.currLat = cityInfo.currLat;
      currCity.currLong = cityInfo.currLong;
      displayWeatherData();

    }

    // remove city from search history
    function removePreviousSearch(){
      // remove search from list of previous searches
      var element = $(this);

      /* search for and remove corresponding element in cities list */
      var elementIndex = element.parent().index();
      previousCities.splice(elementIndex,1);
      localStorage.setItem("previous-cities",JSON.stringify(previousCities));
      /* remove element from DOM */
      $(this).parent().remove();
    }
      

  // Function Calls ----------------------------------------------------------
    loadStorage();


  // Event Listeners ---------------------------------------------------------

    // event listener for search button - search for city
    searchBtnEl.on("click",searchCity);

    // event listener for previous searches - handle previous search clicks
    previousSearchesEl.on("click",".prev-search-btn",handlePreviousSearchBtns);
    previousSearchesEl.on("click",".prev-search-del-btn",removePreviousSearch);

    // autocomplete for search input
    searchInputEl.autocomplete({
      source: citiesList,
      minLength: 3,
    });


});