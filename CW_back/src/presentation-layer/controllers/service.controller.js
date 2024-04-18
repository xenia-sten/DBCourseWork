const ServiceUseCase = require('../../domain-layer/use-cases/service.use-case');

exports.getServices = async (req, res) => {
  const serviceUseCase = new ServiceUseCase();
  try {
    if (req?.params?.serviceId) {
      const id = req.params.serviceId;
      const service = await serviceUseCase.getServiceById(id);

      return res.status(200).send(service);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const services = await serviceUseCase.getServices();

    return res.status(200).send(services);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.createService = async (req, res) => {

  try {
    const serviceUseCase = new ServiceUseCase();
    const data = req.body;

    if (data) {
      const service = await serviceUseCase.createService(data);

      return res.status(201).send(service);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateService = async (req, res) => {
  try {
    const serviceUseCase = new ServiceUseCase();
    const data = req.body;
    if (data || req?.params?.serviceId) {
      const id = req.params.serviceId;
      const service = await serviceUseCase.updateService(id, data);

      return res.status(200).send(service);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.deleteService = async (req, res) => {
  if (req?.params?.serviceId) {
    const id = req.params.serviceId;

    try {
      const serviceUseCase = new ServiceUseCase();
      const service = await serviceUseCase.deleteService(id);

      return res.status(204).send(service);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
};