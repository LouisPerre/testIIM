describe("The isValid function", () => {
    it("should call validateName, validateEmail, validatePassword functions when isValid fn is called", () => {
      // arrange
      const user = new User();

      // #
      // ##
      // ### exercice 4
      // ##
      // #
    // make the mock all (validateName, validatePassword, validateEmail) functions with spyOn for the user object
    //

      // action
      user.isValid();

      // assertion
      expect(user.validatePassword).toHaveBeenCalled();
      expect(user.validateName).toHaveBeenCalled();
      expect(user.validateEmail).toHaveBeenCalled();
  });
});