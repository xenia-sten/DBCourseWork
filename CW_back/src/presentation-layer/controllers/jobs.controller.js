const JobsUseCase = require('../../domain-layer/use-cases/jobs.use-case');

exports.getJobs = async (req, res) => {
  const jobUseCase = new JobsUseCase();
  try {
    if (req?.params?.jobId) {
      const id = req.params.jobId;
      const job = await jobUseCase.getJobById(id);

      return res.status(200).send(job);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const jobs = await jobUseCase.getJobs();

    return res.status(200).send(jobs);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getCategoriesByJobId = async (req, res) => {
  const jobsUseCase = new JobsUseCase();
  try {
    if (req?.params?.jobId) {
      const jobId = req.params.jobId;
      const categories = await jobsUseCase.getCategoriesByJobId(jobId);

      return res.status(200).send(categories);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.createJob = async (req, res) => {

  try {
    const jobUseCase = new JobsUseCase();
    const data = req.body;

    if (data) {
      const job = await jobUseCase.createJob(data);

      return res.status(201).send(job);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateJob = async (req, res) => {
  try {
    const jobUseCase = new JobsUseCase();
    const data = req.body;
    if (data || req?.params?.jobId) {
      const id = req.params.jobId;
      const job = await jobUseCase.updateJob(id, data);

      return res.status(200).send(job);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.deleteJob = async (req, res) => {
  if (req?.params?.jobId) {
    const id = req.params.jobId;

    try {
      const jobUseCase = new JobsUseCase();
      const job = await jobUseCase.deleteJob(id);

      return res.status(204).send(job);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
};