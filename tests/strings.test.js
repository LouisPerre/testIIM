import sayHelloTo from "../src/strings";

describe("The string package", () => {
  describe("the sayHelloTo function", () => {
    it("should return 'Hi, Peter!' if the argument is 'Peter'", () => {
      const actual = sayHelloTo("Peter");
      const expected = "Hi, Peter!";
      expect(actual).toBe(expected);
    });
  });


  describe('the sayHelloTo function', () => {
    test('throws error when called with no arguments', () => {
      expect(() => {
        yourFunction();
      }).toThrow(Error);
    });
  });
});
