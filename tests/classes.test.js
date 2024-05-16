const User = require('./../src/classes');  // assurez-vous que le chemin est correct
const { jest } = require('@jest/globals'); // Importation de jest

describe("The isValid function", () => {
  it("should call validateName, validateEmail, validatePassword functions when isValid fn is called", () => {
    // arrange
    const user = new User();

    // exercice 4: make the mock all (validateName, validatePassword, validateEmail) functions with spyOn for the user object
    const validateNameSpy = jest.spyOn(user, 'validateName');
    const validateEmailSpy = jest.spyOn(user, 'validateEmail');
    const validatePasswordSpy = jest.spyOn(user, 'validatePassword');

    // action
    user.isValid();

    // assertion
    expect(validatePasswordSpy).toHaveBeenCalled();
    expect(validateNameSpy).toHaveBeenCalled();
    expect(validateEmailSpy).toHaveBeenCalled();
  });
});