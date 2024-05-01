module.exports = class User {
  user;

  constructor(user) {
    this.user = {
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
      name: user.name,
      password: user.password
    };
    return this.user;
  }

  get user() {
    return this.user;
  }
};