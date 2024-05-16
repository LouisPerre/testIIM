const faker = require('faker-br');

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.errors = [];
  }

  generateAddress() {
    try {
      const address = {
        streetName: faker.address.streetName(),
        streetNumber: faker.address.streetAddress(),
      };
      return address;
    } catch (error) {
      console.error('Error in generateAddress:', error);
      throw error;
    }
  }

  validateName() {
    if (!this.name) {
      this.errors.push('the name is required');
    } else if (this.name.length < 5) {
      this.errors.push('the name must be at least 5 chars long');
    }
  }
}

module.exports = User;
