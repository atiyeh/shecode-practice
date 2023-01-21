alert("hi");
let currentTime = new Date();
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedensday",
  "Thusday",
  "Friday",
  "Saturday",
];
let week = weekday[currentTime.getDay()];
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = currentTime.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let time = document.querySelector("li.first-row");
time.innerHTML = `${week} ${hour}:${min}`;
//challenge2
function searchForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let inputCity = document.querySelector("#city-input");
  city.innerHTML = `${inputCity.value}`;
}
let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", searchForm);
//challenge3
function makeFarenhait(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 23;
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", makeFarenhait);

function makeceli(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 72;
}
let Celsius = document.querySelector("#celsius-link");
Celsius.addEventListener("click", makeceli);
//adding API for temp and city
function fun2(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = response.data.wind.speed;
}

function fun3(city) {
  let apiKey = "a5071e19f2b7844c8e998b3ff76e1153";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(fun2);
}
function fun1(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  fun3(city);
}

let searchorm = document.querySelector("#search-form");
searchorm.addEventListener("submit", fun1);
fun3("sydney");
//add current button
function position(position) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(fun2);
}
function fun4(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(position);
  fun3("sydney");
}
let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", fun4);
