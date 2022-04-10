const geolocation = {
  getCurrentPosition: () =>
    fetch("https://get.geojs.io/v1/ip/geo.json").then((response) =>
      response.json()
    ),
};

export default geolocation;
