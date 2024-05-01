const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class ClientsOldRepository {
  async getClientsOld() {
    try {
      const clients = await pool.query(
        "SELECT * FROM calendar.client_old"
      );

      if (clients.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      return clients.rows;
    } catch (error) {
      throw error;
    }
  };

  async getClientOldById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.client_old WHERE id=$1";

    try {
      const client = await pool.query(query, value);

      if (!client.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return client.rows[0];

    } catch (error) {
      throw error;
    }
  };
};