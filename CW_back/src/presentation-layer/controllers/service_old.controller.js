const ServiceOldUseCase = require('../../domain-layer/use-cases//service_old.use-case');

exports.getServicesOld = async (req, res) => {
  const serviceUseCase = new ServiceOldUseCase();
  try {
    if (req?.params?.serviceOldId) {
      const id = req.params.serviceOldId;
      const service = await serviceUseCase.getServiceOldById(id);

      return res.status(200).send(service);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const services = await serviceUseCase.getServiceOld();

    return res.status(200).send(services);
  } catch (error) {
    return res.status(400).send(error);
  }
};