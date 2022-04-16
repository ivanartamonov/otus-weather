import Page from "../src/page";
import weather from "./__mocks__/weather";

jest.mock('../src/weather');

describe('Page', () => {
  let page, data;

  beforeEach(() => {
    const root = document.createElement('div');
    page = new Page(root);

    // Example Temperature Data
    data = {
      name: 'London',
      main: {
        temp: 275
      },
      coord: {
        lat: 37.4056,
        lon: -122.0775
      }
    };
  })

  it('makes basic markup', () => {
    expect(page.rootElement.querySelector('.weather-data')).toBeDefined();
    expect(page.rootElement.querySelector('.weather-search')).toBeDefined();
    expect(page.rootElement.querySelector('.search-history')).toBeDefined();
    expect(page.rootElement.querySelector('.map-panel')).toBeDefined();
  })

  it('makes weather markup', () => {
    const el = document.createElement('div');
    const weatherMarkup = page.addWeatherMarkup(el);
    expect(weatherMarkup.querySelector('img')).toBeDefined();
    expect(weatherMarkup.querySelector('.weather-data__temp')).toBeDefined();
    expect(weatherMarkup.querySelector('.weather-data__city')).toBeDefined();
  })

  it('makes search city markup', () => {
    const el = document.createElement('div');
    const markup = page.addWeatherMarkup(el);
    expect(markup.querySelector('form.city-form')).toBeDefined();
    expect(markup.querySelector('input.text-field__input')).toBeDefined();
  })

  it('show\'s temperature and city name', () => {
    page.render(data);
    expect(page.t.innerHTML).toBe('+2°C');
    expect(page.city.innerHTML).toBe('London');

    data.name = 'Kyiv';
    data.main.temp = 260;

    page.render(data);
    expect(page.t.innerHTML).toBe('-13°C');
    expect(page.city.innerHTML).toBe('Kyiv');
  })

  it('renders search history', () => {
    let history = ['London', 'Kyiv'];
    page.renderSearchHistory(history);
    expect(page.searchHistory.querySelectorAll('button').length).toBe(2);

    history = ['London', 'Kyiv', 'New York'];
    page.renderSearchHistory(history);
    const buttons = page.searchHistory.querySelectorAll('button');
    expect(buttons.length).toBe(3);
    expect(buttons[0].innerHTML).toBe(history[0]);
    expect(buttons[1].innerHTML).toBe(history[1]);
    expect(buttons[2].innerHTML).toBe(history[2]);
  })

  it('show city weather', () => {
    weather.findCityCoords('London')
      .then((cityCoords) => weather.get(cityCoords.lat, cityCoords.lon))
      .then((weatherData) => {
        console.log(weatherData);
      })
      .catch((err) => console.error(err));

    //page.showCityWeather('London');
    //expect(page.t.innerHTML).toBe('+2°C');
    //expect(page.city.innerHTML).toBe('London');
  })

  it('locks page', () => {
    expect(page.input.disabled).toBe(false);
    page.lockPage();
    expect(page.input.disabled).toBe(true);
  })

  it('unlocks page', () => {
    page.unlockPage();
    expect(page.input.disabled).toBe(false);
    expect(page.input.value).toBe('');
  })
});