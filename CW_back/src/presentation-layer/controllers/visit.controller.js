const VisitUseCase = require('../../domain-layer/use-cases/visit.use-case');

exports.getVisits = async (req, res) => {
  const visitUseCase = new VisitUseCase();
  try {
    if (req?.params?.visitId) {
      const id = req.params.visitId;
      const visit = await visitUseCase.getVisitById(id);

      return res.status(200).send(visit);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const visits = await visitUseCase.getVisits();

    return res.status(200).send(visits);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.createVisit = async (req, res) => {

  try {
    const visitUseCase = new VisitUseCase();
    const data = req.body;

    if (data) {
      const visit = await visitUseCase.createVisit(data);

      return res.status(201).send(visit);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateVisit = async (req, res) => {
  try {
    const visitUseCase = new VisitUseCase();
    const data = req.body;
    if (data || req?.params?.visitId) {
      const id = req.params.visitId;
      const visit = await visitUseCase.updateVisit(id, data);

      return res.status(200).send(visit);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.deleteVisit = async (req, res) => {
  if (req?.params?.visitId) {
    const id = req.params.visitId;

    try {
      const visitUseCase = new VisitUseCase();
      const visit = await visitUseCase.deleteVisit(id);

      return res.status(204).send(visit);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
};