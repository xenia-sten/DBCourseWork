const JobsRepository = require("../../data-layer/jobs.repository");
const Job = require("../entities/jobs.entity");
const CategoryUseCase = require('./category.use-case');
const { PropertyRequiredError, errors } = require("../../utils/error.util");

module.exports = class JobsUseCase {

  mapFields = {
    id: 'id',
    name: 'name',
    description: 'description',
    user_id: 'user_id'
  };

  async getJobs() {
    const jobRepository = new JobsRepository();

    try {
      const jobDB = await jobRepository.getJobs();
      const jobs = jobDB.map((jobDb) => new Job(jobDb));

      return jobs;
    } catch (error) {
      throw error;
    }
  };

  async getJobById(id) {
    const jobRepository = new JobsRepository();

    try {
      const jobDB = await jobRepository.getJobById(id);
      const job = new Job(jobDB);

      return job;
    } catch (error) {
      throw error;
    }
  };

  async getJobsByUserId(id) {
    const jobRepository = new JobsRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const jobDB = await jobRepository.getJobsByUserId(id);
      const jobs = jobDB.map((jobDb) => new Job(jobDb));

      return jobs;
    } catch (error) {
      throw error;
    }
  };

  async getCategoriesByJobId(id) {
    const categoryUseCase = new CategoryUseCase();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const categoriesByJob = await categoryUseCase.getCategoriesByJobId(id);

      return categoriesByJob;
    } catch (error) {
      throw error;
    }
  };

  async createJob(data) {
    const jobRepository = new JobsRepository();

    if (!data) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const job = await jobRepository.createJob(data);

      return job;
    } catch (error) {
      throw error;
    }
  };

  async updateJob(id, data) {
    const jobRepository = new JobsRepository();

    if (!data) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const updatedJob = await jobRepository.updateJob(id, data);
      const job = new Job(updatedJob);

      return job;
    } catch (error) {
      throw error;
    }
  }

  async deleteJob(id) {
    try {
      const jobRepository = new JobsRepository();

      if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

      const result = await jobRepository.deleteJob(id);
      return result;
    } catch (error) {
      throw error;
    }
  };
};