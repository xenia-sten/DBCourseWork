const ServiceRepository = require("../../data-layer/service.repository");
const Service = require("../entities/service.entity");
const { PropertyRequiredError, errors } = require("../../utils/error.util");


module.exports = class ServiceUseCase {
  mapFields = {
    id: 'id',
    name: 'name',
    price: 'price',
    duration: 'duration',
    user_id: 'user_id',
    company_id: 'company_id',
    category_id: 'category_id',
    description: 'description'
  };

  async getServices() {
    const serviceRepository = new ServiceRepository();

    try {
      const serviceDb = await serviceRepository.getService();
      const services = serviceDb.map((serviceDb) => new Service(serviceDb));

      return services;
    } catch (error) {
      throw error;
    }
  };

  async getServiceById(id) {
    const serviceRepository = new ServiceRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const serviceDb = await serviceRepository.getServiceById(id);
      const service = new Service(serviceDb);

      return service;
    } catch (error) {
      throw error;
    }
  };

  async getServicesByCategoryId(id) {
    const serviceRepository = new ServiceRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const serviceDb = await serviceRepository.getServicesByCategoryId(id);
      const services = serviceDb.map((serviceDb) => new Service(serviceDb));

      return services;
    } catch (error) {
      throw error;
    }
  };

  async createService(data) {
    const serviceRepository = new ServiceRepository();

    if (!data){
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const service = await serviceRepository.createService(data);

      return service;
    } catch (error) {
      throw error;
    }
  };

  async updateService(id, data) {
    const serviceRepository = new ServiceRepository();

    if (!data){
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const updatedService = await serviceRepository.updateService(id, data);
      const service = new Service(updatedService);

      return service;
    } catch (error) {
      throw error;
    }
  }

  async deleteService(id) {
    try {
      const serviceRepository = new ServiceRepository();

      if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

      const result = await serviceRepository.deleteService(id);
      return result;
    } catch (error) {
      throw error;
    }
  };
};