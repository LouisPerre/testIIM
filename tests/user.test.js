const User = require('./../src/user');

describe('The User class', () => {
  it('should create a new user', () => {
    const user1 = new User('smith', 'smith@test.com');
    expect(user1.name).toBe('smith');
    expect(user1.email).toBe('smith@test.com');
    expect(user1.errors).toEqual([]);
  });

  describe('Name validation', () => {
    it('should create new error message if the user name is less than 5 characters', () => {
      const user2 = new User('tom', 'tom@test.com');
      user2.validateName();
      expect(user2.errors).toContain('the name must be at least 5 chars long');
    });

    it('should report an error when the name is missing', () => {
      const user3 = new User('', 'anon@test.com');
      user3.validateName();
      expect(user3.errors).toContain('the name is required');
    });
  });

  describe('Address generation', () => {
    it('should log a generated address', () => {
      const user4 = new User('johnsmith', 'johnsmith@test.com');
      const address = user4.generateAddress();
      console.log('Generated address:', address);
      expect(address).toHaveProperty('streetName');
      expect(address).toHaveProperty('streetNumber');
    });
  });
});
