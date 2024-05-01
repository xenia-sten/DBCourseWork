const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class UsersRepository {
  async getUsers() {
    try {
      const users = await pool.query(
        "SELECT * FROM calendar.users"
      );

      if (users.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      return users.rows;
    } catch (error) {
      throw error;
    }
  };

  async getUserById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.users WHERE id=$1";

    try {
      const user = await pool.query(query, value);

      if (!user.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return user.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async getUsersByCompanyId(id) {
    //const id = parseInt(req.params.id);

    const value = [id];
    const query = `
    SELECT users.*
    FROM calendar.users
    JOIN calendar.users_company ON calendar.users.id = calendar.users_company.user_id
    JOIN calendar.company ON calendar.users_company.company_id = calendar.company.id
    WHERE calendar.company.id = $1
    `;

    try {
      const users = await pool.query(query, value);

      if (users.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return users.rows;

    } catch (error) {
      throw error;
    }
  };

  async getRolesByUserId(id) {
    const value = [id];
    const query =
      "SELECT role FROM calendar.user_roles WHERE user_id=$1";
    try {
      const role = await pool.query(query, value);

      if (role.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return role.rows;

    } catch (error) {
      throw error;
    }
  };

  async createUser(data) {
    const { email, phone_number, name, password, description } = data;
    // const { email, phone_number, name, password, description } = req.body;
    const query =
      "INSERT INTO calendar.users(email, phone_number, name, password, description)  VALUES($1, $2, $3, $4, $5) RETURNING id";
    const values = [email, phone_number, name, password, description];

    try {
      const user = await pool.query(query, values);

      return user.rows[0];

    } catch (error) {
      throw "Ошибка атомарности " + error;
    }
  };

  async updateUser(id, data) {
    const { email, phone_number, name } = data;

    const query =
      "UPDATE calendar.users SET email=$1, phone_number=$2, name=$3 WHERE id=$4 RETURNING *";
    const value = [email, phone_number, name, id];

    try {
      const user = await pool.query(query, value);

      if (!user.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return user.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async deleteUser(id) {
    const value = [id];
    const query = "DELETE FROM calendar.users WHERE id=$1 RETURNING id";

    try {
      const deletedUser = await pool.query(query, value);

      if (!deletedUser.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return deletedUser.rows[0];

    } catch (error) {
      throw error;
    }
  };
};