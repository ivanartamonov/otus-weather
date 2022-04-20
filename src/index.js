import "../assets/styles/reset.css";
import "../assets/styles/main.css";
import weather from "./weather";
import geolocation from "./geolocation";
import Page from "./page";

const page = new Page(document.getElementById("app"));

geolocation
  .getCurrentPosition()
  .then((coords) => weather.get(coords.latitude, coords.longitude))
  .then((weatherData) => page.render(weatherData));
