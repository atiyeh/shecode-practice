function displayDate(timestamp) {
  let date = new Date(timestamp);
  let Dates = date.getDate();
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let months = month[date.getMonth()];
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

  return ` ${months} ${Dates} ${day} ${hour}:${minutes}`;
}
function getForcast(coordinates) {
  console.log(coordinates);
  let key = "f1adfdb622o0f53eb34a701c61b4t32f";
  let apiurl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}`;
  console.log(apiurl);
  axios.get(apiurl).then(displayForecast);
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

  getForcast(response.data.coordinates);
  console.log(response.data);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();

  return weekDays[day];
}

function displayForecast(response) {
  let dailyForcast = response.data.daily;
  console.log(dailyForcast);
  let weatherForcastElement = document.querySelector("#weather-forcast");

  let weatherForcast = `<div class="row">`;
  dailyForcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      weatherForcast =
        weatherForcast +
        ` 
      <div class="col-2">
  <div class="forcast-date">
    ${formatDay(forcastDay.time)}
  </div>
  <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
    forcastDay.condition.icon
  }.png" width="42">
  <div class="forcast-temperature"> 
    <span class="forcast-min-temp">${Math.round(
      forcastDay.temperature.minimum
    )}°</span>
    <span class="forcast-max-temp">${Math.round(
      forcastDay.temperature.maximum
    )}°</span>
  </div>
</div>`;
    }
  });

  weatherForcast = weatherForcast + `</div>`;
  weatherForcastElement.innerHTML = weatherForcast;
}
