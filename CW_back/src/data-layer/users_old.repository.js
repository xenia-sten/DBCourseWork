const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class UsersOldRepository {
  async getUsersOld() {
    try {
      const users = await pool.query(
        "SELECT * FROM calendar.users_old"
      );

      if (users.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      return users.rows;
    } catch (error) {
      throw error;
    }
  };

  async getUserOldById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.users_old WHERE id=$1";

    try {
      const user = await pool.query(query, value);

      if (!user.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return user.rows[0];

    } catch (error) {
      throw error;
    }
  };
};