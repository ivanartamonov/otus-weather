import weather from "../src/weather";

const MOCK_WEATHER = {
  name: 'London',
  main: {
    temp: 275
  },
  coord: {
    lat: 37.4056,
    lon: -122.0775
  }
};

const MOCK_GEO = [
  {
    "name": "London",
    "local_names": {
      "ar": "لندن",
      "en": "London",
      "ru": "Лондон",
    },
    "lat": 51.5085,
    "lon": -0.1257,
    "country": "GB"
  }
];

describe("Weather", () => {
  it('converts to celsius', () => {
    expect(weather.toCelsius(273.15)).toBe(0);
  })

  it('fetch weather', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(MOCK_WEATHER)
    }));

    const data = await weather.get(MOCK_WEATHER.coord.lat, MOCK_WEATHER.coord.lon);
    expect(data).toBe(MOCK_WEATHER);
  })

  it('find city coords', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(MOCK_GEO)
    }));

    const data = await weather.findCityCoords('London');
    expect(data).toBe(MOCK_GEO[0]);
  })
})