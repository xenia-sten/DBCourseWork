const UsersRepository = require("../../data-layer/users.repository");
const { PropertyRequiredError, errors } = require("../../utils/error.util");
const CompanyUseCase = require('./company.use-case');
const JobsUseCase = require('./jobs.use-case');
const VisitUseCase = require('./visit.use-case');
const User = require("../entities/users.entity");

module.exports = class UserUseCase {

  mapFields = {
    id: 'id',
    email: 'email',
    phone_number: 'phone_number',
    name: 'name',
    password: 'password',
    description: 'description'
  };

  async getUsers() {
    const usersRepository = new UsersRepository();

    try {
      const userDb = await usersRepository.getUsers();
      const users = userDb.map((userDb) => new User(userDb));

      return users;
    } catch (error) {
      throw error;
    }
  };

  async getUserById(id) {
    const usersRepository = new UsersRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const userDb = await usersRepository.getUserById(id);
      const user = new User(userDb);

      return user;
    } catch (error) {
      throw error;
    }
  };

  async getUsersByCompanyId(id) {
    //console.log("Зашли в сервисы юзеров");
    const usersRepository = new UsersRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const userDb = await usersRepository.getUsersByCompanyId(id);
      const users = userDb.map((userDb) => new User(userDb));

      return users;
    } catch (error) {
      throw error;
    }
  };

  async getRolesByUserId(id){
    const usersRepository = new UsersRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const roleDb = await usersRepository.getRolesByUserId(id);
      // const users = userDb.map((userDb) => new User(userDb));

      return roleDb;
    } catch (error) {
      throw error;
    }
  };

  async getCompanyByUserId(userId) {
    const companyUseCase = new CompanyUseCase();

    if (!userId) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const companiesByUser = await companyUseCase.getCompaniesByUserId(userId);
      return companiesByUser;

    } catch (error) {
      throw error;
    }

  }

  async getJobsByUserId(userId) {
    const jobsUseCase = new JobsUseCase();

    if (!userId) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const jobsByUser = await jobsUseCase.getJobsByUserId(userId);
      return jobsByUser;

    } catch (error) {
      throw error;
    }
  }

  async getVisitsByUserId(userId) {
    const visitsUseCase = new VisitUseCase();

    if (!userId) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const jobsByUser = await visitsUseCase.getVisitsByUserId(userId);
      return jobsByUser;

    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    const companyRepository = new UsersRepository();

    if (!data){
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const user = await companyRepository.createUser(data);

      return user;
    } catch (error) {
      throw error;
    }
  };

  async updateUser(id, data) {
    const usersRepository = new UsersRepository();

    if (!data || !id){
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const updatedUser =
        await usersRepository.updateUser(id, data);
      const user = new User(updatedUser);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const usersRepository = new UsersRepository();

      if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

      const result = await usersRepository.deleteUser(id);
      return result;
    } catch (error) {
      throw error;
    }
  };


  checkStringFieldsInsert(fields) {
    const keys = fields.map(val => {
      return Object.entries(val)[0][0];
    });

    const IS_VALID = true;

    for (let i = 0; i < keys.length; i++) {
      if (!(keys[i]) in this.mapFields) return !IS_VALID;
    }

    return IS_VALID;
  };

  checkStringFields(fields) {
    const IS_VALID = true;
    const fieldsNormalized = fields
      .map(el => Object.entries(el)[0][0]);

    fieldsNormalized.some(([key, _]) => {
      if (!this.mapFields[key]) {
        return !IS_VALID;
      };
    });

    return IS_VALID;
  }

  reduceFields(fields) {
    return fields.reduce((acc, el) => {
      const entriesEl = Object.entries(el);
      acc[entriesEl[0][0]] = entriesEl[0][1];

      return acc;
    }, {});
  };
};