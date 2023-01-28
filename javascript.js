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

  tempratureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  describeElement.innerHTML = response.data.condition.description;
  HumidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = displayDate(response.data.time * 1000);
}

let key = "f1adfdb622o0f53eb34a701c61b4t32f";
let query = "Paris";
let apiurl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}`;
axios.get(apiurl).then(displayTemperature);
