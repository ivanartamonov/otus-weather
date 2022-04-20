const weatherData = {
  name: "London",
  main: {
    temp: 275,
  },
  coord: {
    lat: 51.5085,
    lon: -0.1257,
  },
};

const cities = {
  London: [
    {
      name: "London",
      local_names: {
        ar: "لندن",
        en: "London",
        ru: "Лондон",
      },
      lat: 51.5085,
      lon: -0.1257,
      country: "GB",
    },
  ],
};

const weather = {
  get(lat, lon) {
    return lat > 0 && lon
      ? Promise.resolve(weatherData)
      : Promise.reject(new Error("Weather was not found"));
  },

  findCityCoords(cityName) {
    return cities[cityName]
      ? Promise.resolve(cities[cityName][0])
      : Promise.reject(new Error("City was not found"));
  },

  toCelsius(fahrenheit) {
    return parseFloat(fahrenheit) - 273.15;
  },
};

export default weather;
