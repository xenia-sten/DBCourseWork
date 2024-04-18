module.exports = class Service {
  service;

  constructor(service) {
    this.service = {
      id: service.id,
      name: service.name,
      price: service.price,
      duration: service.duration,
      user_id: service.user_id,
      company_id: service.company_id,
      category_id: service.category_id,
      description: service.description
    };
    return this.service;
  }

  get service() {
    return this.service;
  }
};