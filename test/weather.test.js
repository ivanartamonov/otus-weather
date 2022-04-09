import weather from "../src/weather";

describe("Weather", () => {
  it('converts to celsius', () => {
    expect(weather.toCelsius(273.15)).toBe(0);
  })
})