class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
      this.errors = [];
    }
    validateName() {
      if (!this.name) {
        this.errors.push("the name is required");
      } else if (this.name.length < 5) {
        this.errors.push("the name must be at least 5 chars long");
      }
    }
  }
  
  module.exports = User;
  