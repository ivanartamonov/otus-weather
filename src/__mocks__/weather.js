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
    return new Promise((resolve, reject) => {
      if (lat > 0 && lon) {
        resolve(weatherData);
      } else {
        reject(new Error("Weather was not found"));
      }
    });
  },

  findCityCoords(cityName) {
    return new Promise((resolve, reject) => {
      if (cities[cityName]) {
        resolve(cities[cityName][0]);
      } else {
        reject(new Error("City was not found"));
      }
    });
  },

  toCelsius(fahrenheit) {
    return parseFloat(fahrenheit) - 273.15;
  },
};

export default weather;
