const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class CategoryRepository {
  async getCategory() {
    try {
      const categories = await pool.query(
        "SELECT * FROM calendar.category"
      );

      if (categories.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      console.log(categories);
      return categories.rows;
    } catch (error) {
      throw error;
    }
  };

  async getCategoryById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.category WHERE id=$1";

    try {
      const category = await pool.query(query, value);

      if (!category.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return category.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async createCategory(data) {
    const { name, job_id } = data;
    const query =
      "INSERT INTO calendar.category(name, job_id)  VALUES($1, $2) RETURNING id";
    const values = [name, job_id];

    try {
      const job = await pool.query(query, values);

      return job.rows[0];

    } catch (error) {
      throw "Ошибка атомарности " + error;
    }
  };

  async updateCategory(id, data) {
    const { name, job_id } = data;

    const query =
      "UPDATE calendar.category SET name=$1, job_id=$2 WHERE id=$3 RETURNING *";
    const value = [name, job_id, id];

    try {
      const category = await pool.query(query, value);

      if (!category.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return category.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async deleteCategory(id) {
    const value = [id];
    const query = "DELETE FROM calendar.category WHERE id=$1 RETURNING id";

    try {
      const deletedCategory = await pool.query(query, value);

      if (!deletedCategory.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      console.log(deletedCategory.rows[0]);

      return deletedCategory.rows[0];

    } catch (error) {
      throw error;
    }
  };
};