const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class VisitRepository {
  async getVisits() {
    try {
      const visits = await pool.query(
        "SELECT * FROM calendar.visit"
      );

      if (visits.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      return visits.rows;
    } catch (error) {
      throw error;
    }
  };

  async getVisitById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.visit WHERE id=$1";

    try {
      const visit = await pool.query(query, value);

      if (!visit.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return visit.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async getVisitsByUserId(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.visit WHERE user_id=$1 OR user_old_id=$1";

    try {
      const visits = await pool.query(query, value);

      if (!visits.rows) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return visits.rows;

    } catch (error) {
      throw error;
    }
  };

  async getVisitsByClientId(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.visit WHERE client_id=$1 OR client_old_id=$1";

    try {
      const visits = await pool.query(query, value);

      if (!visits.rows) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return visits.rows;

    } catch (error) {
      throw error;
    }
  };

  async createVisit(data) {
    const { company_id, user_id, template_id, client_id, visit_date, description } = data;
    const query =
      "INSERT INTO calendar.visit(company_id, user_id, template_id, client_id, visit_date, description)  VALUES($1, $2, $3, $4, $5, $6) RETURNING id";
    const values = [company_id, user_id, template_id, client_id, visit_date, description];

    try {
      const visit = await pool.query(query, values);

      return visit.rows[0];

    } catch (error) {
      throw "Ошибка атомарности " + error;
    }
  };

  async updateVisit(id, data) {
    const { company_id, user_id, template_id, client_id, visit_date, description } = data;

    const query =
      "UPDATE calendar.visit SET company_id=$1, user_id=$2, template_id=$3, client_id=$4, visit_date=$5, description=$6 WHERE id=$7 RETURNING *";
    const value = [company_id, user_id, template_id, client_id, visit_date, description, id];

    try {
      const visit = await pool.query(query, value);

      if (!visit.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return visit.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async deleteVisit(id) {
    const value = [id];
    const query = "DELETE FROM calendar.visit WHERE id=$1 RETURNING id";

    try {
      const deletedVisit = await pool.query(query, value);

      if (!deletedVisit.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return deletedVisit.rows[0];

    } catch (error) {
      throw error;
    }
  };
};