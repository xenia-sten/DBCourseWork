const UsersOldRepository = require("../../data-layer/users_old.repository");
const { PropertyRequiredError, errors } = require("../../utils/error.util");
const User = require("../entities/users.entity");

module.exports = class UserUseCase {

  async getUsersOld() {
    const usersRepository = new UsersOldRepository();

    try {
      const userDb = await usersRepository.getUsersOld();
      const users = userDb.map((userDb) => new User(userDb));

      return users;
    } catch (error) {
      throw error;
    }
  };

  async getUserOldById(id) {
    const usersRepository = new UsersOldRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const userDb = await usersRepository.getUserOldById(id);
      const user = new User(userDb);

      return user;
    } catch (error) {
      throw error;
    }
  };
};