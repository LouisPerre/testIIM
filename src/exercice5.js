const User = require('./user');

const exercice5 = () => {
  try {
    const user = new User('John Doe', 'john.doe@example.com');

    const address = user.generateAddress();

    return address;
  } catch (error) {
    console.error('Error in exercice5:', error);
    throw error;
  }
};

module.exports = { exercice5 };
