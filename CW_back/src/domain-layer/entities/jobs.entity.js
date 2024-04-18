module.exports = class Job {
  job;

  constructor(job) {
    this.job = {
      id: job.id,
      name: job.name,
      description: job.description,
      user_id: job.user_id
    };
    return this.job;
  }

  get job() {
    return this.job;
  }
};