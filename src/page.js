import weather from "./weather";
import Map from "./map";
import imgSun from "../assets/images/sun.svg";
import imgSearch from "../assets/images/search.svg";

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

    this.makeLayout(this.rootElement);
    this.addWeatherMarkup(this.rootElement.querySelector(".weather-data"));
    this.addSearchForm(this.rootElement.querySelector(".weather-search"));

    this.map = new Map(this.rootElement.querySelector(".map-panel"));
    this.searchHistory = this.rootElement.querySelector(".search-history");
    this.city.innerHTML =
      "Определяем ваше местоположение... Разрешите геолокацию";

    this.renderSearchHistory(this.getHistory());
  }

  makeLayout() {
    this.rootElement.innerHTML = `
      <div id="container">
        <div class="row weather-panel">
          <div class="weather-wrapper">
            <div class="weather-data"></div>
            <div class="weather-search"></div>
            <div class="search-history"></div>
          </div>
        </div>
        <div class="row map-panel"></div>
      </div>
    `;
  }

  addWeatherMarkup(el) {
    this.img = document.createElement("img");
    this.img.src = imgSun;
    this.img.className = "weather-data__icon";

    this.t = document.createElement("p");
    this.t.className = "weather-data__temp";

    this.city = document.createElement("p");
    this.city.className = "weather-data__city";

    el.append(this.img);
    el.append(this.t);
    el.append(this.city);

    return el;
  }

  /* eslint no-param-reassign: ["error", { "props": false }] */
  addSearchForm(el) {
    el.innerHTML = `
      <div class="text-field">
        <div class="text-field__icon">
          <form class="city-form">
            <input
              class="text-field__input"
              type="search"
              name="city"
              placeholder="Город"
            />
          </form>
          <span class="text-field__aicon">
            <img src="${imgSearch}" alt="Submit form" />
          </span>
        </div>
      </div>
    `;

    this.form = this.rootElement.querySelector(".city-form");
    this.input = this.rootElement.querySelector(".text-field__input");
    this.form.addEventListener("submit", this.onSubmitSearch);

    return el;
  }

  render(data) {
    const celsius = weather.toCelsius(data.main.temp);
    this.t.innerHTML = `${(celsius > 0 ? "+" : "") + celsius.toFixed()}°C`;
    this.city.innerHTML = data.name;

    this.renderSearchHistory(this.getHistory());
    this.map.render(data.coord.lat, data.coord.lon);
  }

  renderSearchHistory(history) {
    this.searchHistory.innerHTML = "";

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
