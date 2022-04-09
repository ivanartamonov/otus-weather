import "../assets/styles/reset.css";
import "../assets/styles/main.css";
import weather from "./weather";
import geolocation from "./geolocation";

const $city = document.querySelector(".weather-data__city");
const $t = document.querySelector(".weather-data__temp");

$city.innerHTML = "Определяем ваше местоположение... Разрешите геолокацию";

function render(data) {
  const celsius = weather.toCelsius(data.main.temp);
  $t.innerHTML = `${(celsius > 0 ? "+" : "") + celsius.toFixed()}°C`;
  $city.innerHTML = data.name;
}

geolocation
  .getCurrentPosition()
  .then((coords) => weather.get(coords.latitude, coords.longitude))
  .then((weatherData) => render(weatherData));
