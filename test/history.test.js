import History from "../src/history";

describe('History', () => {
  let history;

  beforeEach(() => {
    window.localStorage.clear();
    history = new History(window.localStorage);
  })

  it('add & get', () => {
    expect(history.get()).toStrictEqual([]);

    history.add('London');
    expect(history.get()).toStrictEqual(['London']);

    history.add('Berlin');
    expect(history.get()).toStrictEqual(['Berlin', 'London']);

    history.add('Paris');
    expect(history.get()).toStrictEqual(['Paris', 'Berlin', 'London']);

    // Duplicate last city
    history.add('Paris');
    expect(history.get()).toStrictEqual(['Paris', 'Berlin', 'London']);

    // Duplicate not last city
    history.add('Berlin');
    expect(history.get()).toStrictEqual(['Berlin', 'Paris', 'London']);
  })

  it('saves only last 10 cities', () => {
    expect(history.get()).toStrictEqual([]);

    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    items.forEach(el => history.add(el));
    expect(history.get().length).toBe(10);
    expect(history.get()).toStrictEqual(items.reverse());

    history.add(11);
    expect(history.get().length).toBe(10);
    expect(history.get()).toStrictEqual([11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  })
})