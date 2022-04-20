const geolocation = {
  getCurrentPosition: () =>
    fetch("https://get.geojs.io/v1/ip/geo.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch((err) => console.log("Error: ", err)),
};

export default geolocation;
