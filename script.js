// global variable
let result = "";
let geoMsg = "";

function showPosition() {
    
    // Store the element where the page displays the result
    result = document.getElementById("result");
    
    // If geolocation is available, try to get the visitor's position
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        //result.innerHTML = "<textarea>"Detecting geological location..</textarea>";
        this.geoMsg = "Detecting geological location...";
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
        this.geoMsg = "Sorry, your browser does not support HTML5 geolocation.";
    }
};

// Define callback function for successful attempt
function successCallback(position) {
    //result.innerHTML = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";

    // passing lng/let to weather api call
    getLocalWeather(position.coords.longitude, position.coords.latitude, this.geoMsg, 0);
}

// Define callback function for failed attempt
function errorCallback(error) {
    if(error.code == 1) {
        this.geoMsg += "You've decided not to share your position, but it's OK. We won't ask you again.  ";
    } else if(error.code == 2) {
        this.geoMsg += "The network is down or the positioning service can't be reached.  ";
    } else if(error.code == 3) {
        this.geoMsg += "The attempt timed out before it could get the location data.  ";
    } else {
        this.geoMsg += "Geolocation failed due to unknown error.  ";
    }
    result.innerHTML = "<textarea>"+  this.geoMsg + "Showing weather in London instead.</textarea>";
    getLocalWeather(51.509865, -0.118092, this.geoMsg, 1);

}

// convert celsius to farenheit
function cToF(celsius) 
{
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  var message = cTemp+'\xB0C <==> ' + cToFahr + ' \xB0F.';
  return message;
}

function getLocalWeather(longitude, latitude, message, defaultLocale=0){
  let xhttp = new XMLHttpRequest();
  
  
  const urlStr = "https://weather-proxy.freecodecamp.rocks/api/current?lat=" + latitude + "&lon=" + longitude;
  // https://weather-proxy.freecodecamp.rocks/api/current?lat=37.548271&lon=-121.988571
  xhttp.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(xhttp.responseText);
          let imgurl = response.weather[0].icon;
          let locality = "City: " + response.name;
          let datetime = new Date(response.dt);
          let lastupdated = datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear()+" "+datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds();
          let lnglat = 'Longitude: ' + response.coord.lon + '  Latitude: ' + response.coord.lat;
          let condition = "Condition: " + response.weather[0].description;
          let temperature = cToF(response.main.temp);
          let feelTemperature = cToF(response.main.feels_like);
          let lowTemp = cToF(response.main.temp_min);
          let hiTemp = cToF(response.main.temp_max);
          let img = `<div class="imgbox" src="${ imgurl }"  alt="Lights" style="width:100%"></div>`
          let htmlSegment = "";
          if (defaultLocale === 0) {
              htmlSegment += "<textarea width=100%> " + message + " Found " + response.name + ".</textarea>"; 
          } else {
              message = "";
          }
          
          htmlSegment += `<img class="weather"> 
            <li>${locality} 
              <img src=${imgurl}  alt="Lights">
              <ul>${condition}</ul> 
              <ul>Temperature: ${ temperature }</ul>
              <ul>Feels like: ${ feelTemperature }</ul> 
              <ul>Low: ${ lowTemp }</ul>
              <ul>Max: ${ hiTemp }</ul>
              <ul>Pressure: ${ response.main.pressure }</ul>
              <ul>Humidity: ${ response.main.humidity }</ul>
              <ul>Visibility: ${ response.visibility }</ul> 
              <ul>Wind speed: ${ response.wind.speed } km/h</ul>
              <ul>Wind direction: ${ response.wind.deg } &#xb0; </ul>
              <ul>Cloud cover:${ response.clouds.all }</ul>
            </li> </div>`;
          let html = img + htmlSegment;
          let forecast_data = document.querySelector('.localforecast');
          forecast_data.innerHTML = htmlSegment;
        }
    }
    xhttp.open("GET", urlStr, true);
    xhttp.send();
}

showPosition();

