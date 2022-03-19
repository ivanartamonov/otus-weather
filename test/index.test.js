import sayHello from "../src";

describe("sayHello", () => {
  it('say what you want', () => {
    expect(sayHello('world!')).toBe("Hello, world!");
  })
})