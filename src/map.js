class Map {
  apiKey = "AIzaSyB1RMnKzcvlp3v90ei9EUIFlAn5qbFuzqc";

  baseUrl = "https://maps.googleapis.com/maps/api/staticmap";

  // Html Container for Map
  container;

  constructor(htmlContainer) {
    this.container = htmlContainer;
  }

  render(lat, lon) {
    const params = {
      key: this.apiKey,
      size: `640x640`,
      center: `${lat},${lon}`,
      zoom: 10,
      map_id: "fa7cf5ec5edea579",
    };

    const searchParams = new URLSearchParams(params);
    const url = `${this.baseUrl}?${searchParams.toString()}`;

    const img = document.createElement("img");
    img.src = url;

    this.container.innerHTML = "";
    this.container.append(img);
  }
}

export default Map;
