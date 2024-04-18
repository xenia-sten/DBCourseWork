//const knex = require("../../config/knex.config");
const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");
//const TABLE = "company";
//console.log(pool);

module.exports = class CompaniesRepository {
  async getCompanies() {
    try {
      console.log('Зашли repository');
      //const companies = await knex.withSchema('calendar').select().table('company');
      const companies = await pool.query(
        "SELECT * FROM calendar.company"
      );

      if (companies.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return companies.rows;
      //return companies;

    } catch (error) {
      throw error;
    }
  };

  async getCompanyById(id) {
    //const id = parseInt(req.params.id);
    console.log('Зашли repository');
    const value = [id];
    const query = "SELECT * FROM calendar.company WHERE id=$1";

    try {
      const company = await pool.query(query, value);

      if (!company.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return company.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async getCompaniesByUserId(id) {
    //const id = parseInt(req.params.id);
    console.log('Зашли в репозитории компаний');

    const value = [id];
    const query = `
    SELECT company.*
    FROM calendar.company
    JOIN calendar.users_company ON calendar.company.id = calendar.users_company.company_id
    JOIN calendar.users ON calendar.users_company.user_id = calendar.users.id
    WHERE calendar.users.id = $1
    `;

    try {
      const companies = await pool.query(query, value);

      if (companies.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return companies.rows;

    } catch (error) {
      throw error;
    }
  };

  async createCompany(data) {
    console.log('Зашли repository');
    const { name, description } = data;
    // const { name, description } = req.body;
    const query =
      "INSERT INTO calendar.company(name, description)  VALUES($1, $2) RETURNING id";
    const values = [name, description];

    try {
      const company = await pool.query(query, values);

      return company.rows[0];

    } catch (error) {
      throw "Ошибка атомарности " + error;
    }
  };

  async addUserInCompany(companyId, userId) {
    console.log('Зашли repository');
    //const { name, description } = data;
    // const { name, description } = req.body;
    const query =
      "INSERT INTO calendar.users_company(user_id, company_id)  VALUES($1, $2) RETURNING *";
    const values = [userId, companyId];

    try {
      const user_company = await pool.query(query, values);

      return user_company.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async updateCompany(id, data) {
    //const id = parseInt(req.params.id);
    const { name, description } = data;
    //req.body;

    const query =
      "UPDATE calendar.company SET name=$1, description=$2 WHERE id=$3 RETURNING *";
    const value = [name, description, id];

    try {
      const company = await pool.query(query, value);

      if (!company.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
 
      return company.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async deleteCompany(id) {
    console.log('Зашли в repos');
    //const id = parseInt(req.params.id);
    const value = [id];
    const query = "DELETE FROM calendar.company WHERE id=$1 RETURNING id";

    try {
      const deletedCompany = await pool.query(query, value);

      if (!deletedCompany.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      //console.log(deletedCompany.rows[0]);
      
      return deletedCompany.rows[0];

    } catch (error) {
      throw error;
    }
  };
};