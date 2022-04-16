class History {
  KEY = "history";

  storage;

  constructor(storage) {
    this.storage = storage;
  }

  add(city) {
    let items = this.get();
    items = items.filter((item) => item !== city);
    items.unshift(city);
    items = items.splice(0, 10);
    this.storage.setItem("history", JSON.stringify(items));
  }

  get() {
    return JSON.parse(this.storage.getItem(this.KEY)) || [];
  }
}

export default History;
