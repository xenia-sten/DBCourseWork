const { pool } = require('../../sql/execute-sql');
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class JobsRepository {
  
  async getJobs() {
    try {
      const jobs = await pool.query(
        "SELECT * FROM calendar.jobs"
      );

      if (jobs.rowCount == 0) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      //console.log(jobs);
      return jobs.rows;
    } catch (error) {
      throw error;
    }
  };

  async getJobById(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.jobs WHERE id=$1";

    try {
      const jobs = await pool.query(query, value);

      if (!jobs.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return jobs.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async getJobsByUserId(id) {
    const value = [id];
    const query = "SELECT * FROM calendar.jobs WHERE user_id=$1";

    try {
      const jobs = await pool.query(query, value);

      if (!jobs.rows) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return jobs.rows;

    } catch (error) {
      throw error;
    }
  };

  async createJob(data) {
    const { name, description, user_id } = data;
    const query =
      "INSERT INTO calendar.jobs(name, description, user_id)  VALUES($1, $2, $3) RETURNING id";
    const values = [name, description, user_id];

    try {
      const job = await pool.query(query, values);

      return job.rows[0];

    } catch (error) {
      throw "Ошибка атомарности " + error;
    }
  };

  async updateJob(id, data) {
    const { name, description, user_id } = data;

    const query =
      "UPDATE calendar.jobs SET name=$1, description=$2, user_id=$3 WHERE id=$4 RETURNING *";
    const value = [name, description, user_id, id];

    try {
      const job = await pool.query(query, value);

      if (!job.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));

      return job.rows[0];

    } catch (error) {
      throw error;
    }
  };

  async deleteJob(id) {
    const value = [id];
    const query = "DELETE FROM calendar.jobs WHERE id=$1 RETURNING id";

    try {
      const deletedJob = await pool.query(query, value);

      if (!deletedJob.rows[0]) throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      console.log(deletedJob.rows[0]);

      return deletedJob.rows[0];

    } catch (error) {
      throw error;
    }
  };
};