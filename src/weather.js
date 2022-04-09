const weather = {
  apiKey: "d62132a71a9144c3594bd6a136b16dfc",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",

  get(lat, lon) {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    return fetch(url).then((response) => response.json());
  },

  toCelsius(fahrenheit) {
    return parseFloat(fahrenheit) - 273.15;
  },
};

export default weather;
