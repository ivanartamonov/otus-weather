const weather = {
  apiKey: "d62132a71a9144c3594bd6a136b16dfc",
  baseUrl: "https://api.openweathermap.org/",

  get(lat, lon) {
    const url = `${this.baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch((err) => new Error(err));
  },

  findCityCoords(cityName) {
    const url = `${this.baseUrl}geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(
        (data) =>
          new Promise((resolve, reject) => {
            if (data[0]) {
              resolve(data[0]);
            }
            reject(new Error("City was not found"));
          })
      )
      .catch((err) => console.log("Error: ", err));
  },

  toCelsius(fahrenheit) {
    return parseFloat(fahrenheit) - 273.15;
  },
};

export default weather;
