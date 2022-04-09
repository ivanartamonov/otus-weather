import "../assets/styles/reset.css";
import "../assets/styles/main.css";

const $el = document.querySelector(".weather-data__city");
const $t = document.querySelector(".weather-data__temp");
const geo = navigator.geolocation;

$el.innerHTML = "Определяем ваше местоположение... Разрешите геолокацию";

function showTemp(data) {
  $el.innerHTML = data.name;
  const celsius = parseFloat(data.main.temp) - 273.15;
  $t.innerHTML = `${(celsius > 0 ? "+" : "") + celsius.toFixed()}°C`;
}

function getWeather(lat, lon) {
  const key = "d62132a71a9144c3594bd6a136b16dfc";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.info(data);
      showTemp(data);
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`);
    });
}

geo.getCurrentPosition(
  (res) => {
    getWeather(res.coords.latitude, res.coords.longitude);
  },
  (error) => {
    console.error(error.message);
    $el.innerHTML =
      "Не удалось определить ваше местоположение... Укажите город руками";
  }
);

export default function sayHello(msg) {
  return `Hello, ${msg}`;
}
