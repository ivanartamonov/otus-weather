import weather from "./weather";

class Page {
  rootElement;

  city;

  t;

  form;

  input;

  constructor(rootElement) {
    this.rootElement = rootElement;

    this.city = this.rootElement.querySelector(".weather-data__city");
    this.t = this.rootElement.querySelector(".weather-data__temp");
    this.form = this.rootElement.querySelector(".city-form");
    this.input = this.rootElement.querySelector(".text-field__input");

    this.form.addEventListener("submit", this.showWeatherInCity);
    this.city.innerHTML =
      "Определяем ваше местоположение... Разрешите геолокацию";
  }

  render(data) {
    const celsius = weather.toCelsius(data.main.temp);
    this.t.innerHTML = `${(celsius > 0 ? "+" : "") + celsius.toFixed()}°C`;
    this.city.innerHTML = data.name;
  }

  showWeatherInCity = (event) => {
    event.preventDefault();

    this.input.disabled = true;

    weather
      .findCityCoords(this.input.value)
      .then((cityData) => weather.get(cityData.lat, cityData.lon))
      .then((weatherData) => this.render(weatherData))
      .catch((err) => console.error(err))
      .finally(() => {
        this.input.disabled = false;
        this.input.value = "";
      });
  };
}

export default Page;
