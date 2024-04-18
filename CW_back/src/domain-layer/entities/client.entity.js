module.exports = class Client {
  client;

  constructor(client) {
    this.client = {
      id: client.id,
      company_id: client.company_id,
      email: client.email,
      phone_number: client.phone_number,
      name: client.name,
      description: client.description
    };
    return this.client;
  }

  get client() {
    return this.client;
  }
};