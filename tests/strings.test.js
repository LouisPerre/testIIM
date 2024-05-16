import sayHelloTo from "../src/strings";

describe("The string package", () => {
  describe("the sayHelloTo function", () => {
    it("should return 'Hi, Peter!' if the argument is 'Peter'", () => {
      const actual = sayHelloTo("Peter");
      const expected = "Hi, Peter !";
      expect(actual).toBe(expected);
    });
  });

// #
// ##
// ### exercice 0
// ##
// #
// Make new describe
// no data in argument error TDD
});
