const ServiceOldRepository = require("../../data-layer/service_old.repository");
const Service = require("../entities/service.entity");
const { PropertyRequiredError, errors } = require("../../utils/error.util");


module.exports = class ServiceUseCase {
  async getServiceOld() {
    const serviceRepository = new ServiceOldRepository();

    try {
      const serviceDb = await serviceRepository.getServiceOld();
      const services = serviceDb.map((serviceDb) => new Service(serviceDb));

      return services;
    } catch (error) {
      throw error;
    }
  };

  async getServiceOldById(id) {
    const serviceRepository = new ServiceOldRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const serviceDb = await serviceRepository.getServiceOldById(id);
      const service = new Service(serviceDb);

      return service;
    } catch (error) {
      throw error;
    }
  };
};