import "../assets/styles/reset.css";
import "../assets/styles/main.css";
import weather from "./weather";
import geolocation from "./geolocation";

const $city = document.querySelector(".weather-data__city");
const $t = document.querySelector(".weather-data__temp");
const $form = document.querySelector(".city-form");
const $input = document.querySelector(".text-field__input");

function render(data) {
  const celsius = weather.toCelsius(data.main.temp);
  $t.innerHTML = `${(celsius > 0 ? "+" : "") + celsius.toFixed()}°C`;
  $city.innerHTML = data.name;
}

function showWeatherInCity(event) {
  event.preventDefault();

  $input.disabled = true;

  weather
    .findCityCoords($input.value)
    .then((cityData) => weather.get(cityData.lat, cityData.lon))
    .then((weatherData) => render(weatherData))
    .catch((err) => console.error(err))
    .finally(() => {
      $input.disabled = false;
      $input.value = "";
    });
}

$form.addEventListener("submit", showWeatherInCity);
$city.innerHTML = "Определяем ваше местоположение... Разрешите геолокацию";

geolocation
  .getCurrentPosition()
  .then((coords) => weather.get(coords.latitude, coords.longitude))
  .then((weatherData) => render(weatherData));
