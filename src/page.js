import weather from "./weather";
import Map from "./map";

class Page {
  // Root HTML element, from witch we find every other elements
  rootElement;

  // Html element for displaying City Name
  city;

  // Html element for displaying temperature
  t;

  // Html form
  form;

  // Html search city input
  input;

  // Html element for rendering previous search history
  searchHistory;

  // LocalStorage object
  storage;

  map;

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.storage = window.localStorage;
    this.map = new Map(this.rootElement.querySelector(".map-panel"));

    this.city = this.rootElement.querySelector(".weather-data__city");
    this.t = this.rootElement.querySelector(".weather-data__temp");
    this.form = this.rootElement.querySelector(".city-form");
    this.input = this.rootElement.querySelector(".text-field__input");
    this.searchHistory = this.rootElement.querySelector(".search-history");

    this.form.addEventListener("submit", this.onSubmitSearch);
    this.city.innerHTML =
      "Определяем ваше местоположение... Разрешите геолокацию";
    this.renderSearchHistory();
  }

  render(data) {
    const celsius = weather.toCelsius(data.main.temp);
    this.t.innerHTML = `${(celsius > 0 ? "+" : "") + celsius.toFixed()}°C`;
    this.city.innerHTML = data.name;

    this.renderSearchHistory();
    this.map.render(data.coord.lat, data.coord.lon);
  }

  renderSearchHistory() {
    this.searchHistory.innerHTML = "";

    const history = this.getHistory();

    history.forEach((city) => {
      const btn = document.createElement("button");
      btn.className = "tag-btn";
      btn.innerHTML = city;
      btn.addEventListener("click", this.onClickCity);

      this.searchHistory.append(btn);
    });
  }

  onSubmitSearch = (event) => {
    event.preventDefault();
    this.showCityWeather(this.input.value);
  };

  onClickCity = (event) => {
    this.showCityWeather(event.target.innerHTML);
  };

  showCityWeather(cityName) {
    this.lockPage();

    weather
      .findCityCoords(cityName)
      .then((cityCoords) => weather.get(cityCoords.lat, cityCoords.lon))
      .then((weatherData) => {
        this.saveHistory(cityName);
        this.render(weatherData);
      })
      .catch((err) => console.error(err))
      .finally(() => this.unlockPage());
  }

  saveHistory(city) {
    let items = this.getHistory();
    items = items.filter((item) => item !== city);
    items.push(city);
    this.storage.setItem("history", JSON.stringify(items));
  }

  getHistory() {
    const history = JSON.parse(this.storage.getItem("history")) || [];
    return history.reverse();
  }

  lockPage() {
    this.input.disabled = true;
  }

  unlockPage() {
    this.input.disabled = false;
    this.input.value = "";
  }
}

export default Page;
