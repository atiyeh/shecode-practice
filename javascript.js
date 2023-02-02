function displayDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

function displayTemperature(response) {
  let tempratureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-name");
  let timeElement = document.querySelector("#current-time");
  let describeElement = document.querySelector("#weather-details");
  let HumidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  tempratureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  describeElement.innerHTML = response.data.condition.description;
  HumidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = displayDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
}
function search(city) {
  let key = "f1adfdb622o0f53eb34a701c61b4t32f";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
  axios.get(apiurl).then(displayTemperature);
}
function displayCity(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  search(cityinput.value);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
search("tehran");

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", displayCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayForecast() {
  let weatherForcastElement = document.querySelector("#weather-forcast");
  let weekDays = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let weatherForcast = `<div class="row">`;
  weekDays.forEach(function (day) {
    weatherForcast =
      weatherForcast +
      ` 
      <div class="col-2">
  <div class="forcast-date">
    ${day}
  </div>
  <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png" width="42">
  <div class="forcast-temperature"> 
    <span class="forcast-min-temp">10°</span>
    <span class="forcast-max-temp">12°</span>
  </div>
</div>`;
  });
  weatherForcast = weatherForcast + `</div>`;
  weatherForcastElement.innerHTML = weatherForcast;
}
displayForecast();
