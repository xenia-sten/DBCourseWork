const ClientRepository = require("../../data-layer/client.repository");
const Client = require("../entities/client.entity");
const { PropertyRequiredError, errors } = require("../../utils/error.util");
const VisitUseCase = require('./visit.use-case');


module.exports = class ClientUseCase {

  mapFields = {
    id: 'id',
    company_id: 'company_id',
    email: 'email',
    phone_number: 'phone_number',
    name: 'name',
    description: 'description'
  };

  async getClients() {
    const clientRepository = new ClientRepository();

    try {
      const clientDb = await clientRepository.getClients();
      const clients = clientDb.map((userDb) => new Client(userDb));

      return clients;
    } catch (error) {
      throw error;
    }
  };

  async getClientById(id) {
    const clientRepository = new ClientRepository();

    try {
      const clientDb = await clientRepository.getClientById(id);
      const client = new Client(clientDb);

      return client;
    } catch (error) {
      throw error;
    }
  };

  async getClientsByCompanyId(id) {
    const clientRepository = new ClientRepository();

    try {
      const clientDb = await clientRepository.getClientsByCompanyId(id);
      const client = clientDb.map((userDb) => new Client(userDb));

      return client;
    } catch (error) {
      throw error;
    }
  };

  async getVisitsByClientId(id) {
    const visitUseCase = new VisitUseCase();

    try {
      const visitsByClient = await visitUseCase.getVisitsByClientId(id);

      return visitsByClient;
    } catch (error) {
      throw error;
    }
  };

  async createClient(data) {
    const clientRepository = new ClientRepository();

    if (!data) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const client = await clientRepository.createClient(data);

      return client;
    } catch (error) {
      throw error;
    }
  };

  async updateClient(id, data) {
    const clientRepository = new ClientRepository();

    if (!data) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const updatedClient = await clientRepository.updateClient(id, data);
      const client = new Client(updatedClient);

      return client;
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(id) {
    try {
      const clientRepository = new ClientRepository();

      if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

      const result = await clientRepository.deleteClient(id);
      return result;
    } catch (error) {
      throw error;
    }
  };
};