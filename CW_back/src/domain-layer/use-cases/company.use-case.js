const CompanyRepository = require("../../data-layer/company.repository");
const Company = require("../entities/company.entity");
const { PropertyRequiredError, errors } = require("../../utils/error.util");

const UserUseCase = require('./users.use-case');
const ClientUseCase = require('./client.use-case');

module.exports = class CompanyUseCase {

  mapFields = {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  async getCompanies() {
    const companyRepository = new CompanyRepository();

    try {
      const companyDb = await companyRepository.getCompanies();
      const companies = companyDb.map((companyDb) => new Company(companyDb));

      return companies;
    } catch (error) {
      throw error;
    }
  };

  async getCompanyById(companyId) {
    const companyRepository = new CompanyRepository();

    try {
      const companyDb = await companyRepository.getCompanyById(companyId);
      const company = new Company(companyDb);

      return company;
    } catch (error) {
      throw error;
    }
  };

  async getCompaniesByUserId(id) {
    const companyRepository = new CompanyRepository();

    try {
      const companyDb = await companyRepository.getCompaniesByUserId(id);
      const companies = companyDb.map((companyDb) => new Company(companyDb));

      return companies;
    } catch (error) {
      throw error;
    }
  };

  async getUsersByCompanyId(companyId) {
    try {
      const userUseCase = new UserUseCase();
      const usersByCompany = await userUseCase.getUsersByCompanyId(companyId);
      return usersByCompany;

    } catch (error) {
      throw error;
    }
  }

  async getClientsByCompanyId(companyId) {
    const clientUseCase = new ClientUseCase();

    try {
      const clientsByCompany = await clientUseCase.getClientsByCompanyId(companyId);
      return clientsByCompany;

    } catch (error) {
      throw error;
    }
  };

  async createCompany(data) {
    const companyRepository = new CompanyRepository();

    if (!data) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    // if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
    //   throw "Нет данных для вставки";
    // };

    // const fields = data.fields;
    // const isStringChecked = this.checkStringFieldsInsert(fields);

    // if (!isStringChecked) {
    //   throw "Неверные поля переданы";
    // }

    try {
      const company = await companyRepository.createCompany(data);
      //const company = await companyRepository.createCompany(this.reduceFields(fields));

      return company;
    } catch (error) {
      throw error;
    }
  };

  async addUserInCompany(companyId, userId) {
    const companyRepository = new CompanyRepository();

    if (!companyId || !userId) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const user_company = await companyRepository.addUserInCompany(companyId, userId);
      //const company = await companyRepository.createCompany(this.reduceFields(fields));

      return user_company;
    } catch (error) {
      throw error;
    }
  };

  async deleteUserInCompany(companyId, userId) {
    const companyRepository = new CompanyRepository();

    if (!companyId || !userId) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    try {
      const user_company = await companyRepository.deleteUserInCompany(companyId, userId);
      //const company = await companyRepository.createCompany(this.reduceFields(fields));

      return user_company;
    } catch (error) {
      throw error;
    }

  };

  async updateCompany(id, data) {
    const companyRepository = new CompanyRepository();

    if (!data) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    // if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
    //   throw "Нет данных для обновления";
    // };

    // const elWithId = data.fields.find(el => el.id);

    // if (!elWithId) {
    //   throw "Нет id для обновления";
    // };

    // const fields = data.fields;
    // const isStringChecked = this.checkStringFields(fields);

    // if (!isStringChecked) {
    //   throw "Неверные поля переданы";
    // };

    try {
      const updatedCompany = await companyRepository.updateCompany(id, data);
      const company = new Company(updatedCompany);

      return company;
    } catch (error) {
      throw error;
    }
  }

  async deleteCompany(id) {
    try {

      if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

      const companyRepository = new CompanyRepository();
      const result = await companyRepository.deleteCompany(id);
      return result;
    } catch (error) {
      throw error;
    }
  };


  // checkStringFieldsInsert(fields) {
  //   const keys = fields.map(val => {
  //     return Object.entries(val)[0][0];
  //   });

  //   const IS_VALID = true;

  //   for (let i = 0; i < keys.length; i++) {
  //     if (!(keys[i]) in this.mapFields) return !IS_VALID;
  //   }

  //   return IS_VALID;
  // };

  // checkStringFields(fields) {
  //   const IS_VALID = true;
  //   const fieldsNormalized = fields
  //     .map(el => Object.entries(el)[0][0]);

  //   fieldsNormalized.some(([key, _]) => {
  //     if (!this.mapFields[key]) {
  //       return !IS_VALID;
  //     };
  //   });

  //   return IS_VALID;
  // }

  // reduceFields(fields) {
  //   return fields.reduce((acc, el) => {
  //     const entriesEl = Object.entries(el);
  //     acc[entriesEl[0][0]] = entriesEl[0][1];

  //     return acc;
  //   }, {});
  // };
};
