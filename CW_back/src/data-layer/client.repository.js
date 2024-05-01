const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class ClientsRepository {
  async getClients() {
    try {
      const clients = await pool.query(
        "SELECT * FROM calendar.client"
      );

      if (clients.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      return clients.rows;
    } catch (error) {
      throw error;
    }
  };

  async getClientById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.client WHERE id=$1";

    try {
      const client = await pool.query(query, value);

      if (!client.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return client.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async getClientsByCompanyId(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.client WHERE company_id=$1";
    try {
      const users = await pool.query(query, value);
      if (users.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return users.rows;

    } catch (error) {
      throw error;
    }
  };

  async createClient(data) {
    const { company_id, email, phone_number, name, description } = data;
    const query =
      "INSERT INTO calendar.client(company_id, email, phone_number, name, description)  VALUES($1, $2, $3, $4, $5) RETURNING id";
    const values = [company_id, email, phone_number, name, description];

    try {
      const client = await pool.query(query, values);

      return client.rows[0];

    } catch (error) {
      throw "Ошибка атомарности " + error;
    }
  };

  async updateClient(id, data) {
    const { company_id, email, phone_number, name, description } = data;

    const query =
      "UPDATE calendar.client SET company_id=$1, email=$2, phone_number=$3, name=$4, description=$5 WHERE id=$6 RETURNING *";
    const value = [company_id, email, phone_number, name, description, id];

    try {
      const client = await pool.query(query, value);

      if (!client.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return client.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async deleteClient(id) {
    const value = [id];
    const query = "DELETE FROM calendar.client WHERE id=$1 RETURNING id";

    try {
      const deletedClient = await pool.query(query, value);

      if (!deletedClient.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return deletedClient.rows[0];

    } catch (error) {
      throw error;
    }
  };
};