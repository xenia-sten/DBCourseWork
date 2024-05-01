const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class ServiceRepository {
  async getService() {
    try {
      const services = await pool.query(
        "SELECT * FROM calendar.service_template"
      );

      if (services.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      return services.rows;
    } catch (error) {
      throw error;
    }
  };

  async getServiceById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.service_template WHERE id=$1";

    try {
      const service = await pool.query(query, value);

      if (!service.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return service.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async getServicesByCategoryId(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.service_template WHERE category_id=$1";

    try {
      const services = await pool.query(query, value);
      if (!services.rows) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return services.rows;

    } catch (error) {
      throw error;
    }
  };

  async createService(data) {
    const { name, price, duration, user_id, company_id, category_id, description } = data;
    const query =
      "INSERT INTO calendar.service_template(name, price, duration, user_id, company_id, category_id, description)  VALUES($1, $2, $3, $4, $5 ,$6, $7) RETURNING id";
    const values = [name, price, duration, user_id, company_id, category_id, description];

    try {
      const service = await pool.query(query, values);

      return service.rows[0];

    } catch (error) {
      throw "Ошибка атомарности " + error;
    }
  };

  async updateService(id, data) {
    const { name, price, duration, user_id, company_id, category_id, description } = data;

    const query =
      "UPDATE calendar.service_template SET name=$1, price=$2, duration=$3, user_id=$4, company_id=$5, category_id=$6, description=$7 WHERE id=$8 RETURNING *";
    const value = [name, price, duration, user_id, company_id, category_id, description, id];

    try {
      const service = await pool.query(query, value);

      if (!service.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return service.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async deleteService(id) {
    const value = [id];
    const query = "DELETE FROM calendar.service_template WHERE id=$1 RETURNING id";

    try {
      const deletedService = await pool.query(query, value);

      if (!deletedService.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return deletedService.rows[0];

    } catch (error) {
      throw error;
    }
  };
};