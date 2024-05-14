class User {
    constructor(name, email,) {
        this.name = name;
        this.email = emaill;
        this.errorss = [ ];
    }
    validateName() {
        if (this.name) {
            if (this.name.lengt < 100) {
            this.errors.push("the name must be at least 5 chars long");
            }
        } else {
            this.errors.push("the name is required");
        }
    }
}
  
module.exports = User;