const weather = {
  apiKey: "d62132a71a9144c3594bd6a136b16dfc",
  baseUrl: "https://api.openweathermap.org/",

  get(lat, lon) {
    const url = `${this.baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    return fetch(url).then((response) => response.json());
  },

  findCityCoords(cityName) {
    const url = `${this.baseUrl}geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;

    return fetch(url)
      .then((response) => response.json())
      .then(
        (data) =>
          new Promise((resolve, reject) => {
            if (data[0]) {
              resolve(data[0]);
            }
            reject(new Error("City was not found"));
          })
      );
  },

  toCelsius(fahrenheit) {
    return parseFloat(fahrenheit) - 273.15;
  },
};

export default weather;
