const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class ServiceRepository {
  async getServiceOld() {
    try {
      const services = await pool.query(
        "SELECT * FROM calendar.service_template_old"
      );

      if (services.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      return services.rows;
    } catch (error) {
      throw error;
    }
  };

  async getServiceOldById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.service_template_old WHERE id=$1";

    try {
      const service = await pool.query(query, value);

      if (!service.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return service.rows[0];

    } catch (error) {
      throw error;
    }
  };
};