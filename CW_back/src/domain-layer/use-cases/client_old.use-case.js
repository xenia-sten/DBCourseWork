const ClientOldRepository = require("../../data-layer/client_old.repository");
const Client = require("../entities/client.entity");
//const { PropertyRequiredError, errors } = require("../../utils/error.util");

module.exports = class ClientUseCase {

  async getClientsOld() {
    const clientRepository = new ClientOldRepository();

    try {
      const clientDb = await clientRepository.getClientsOld();
      const clients = clientDb.map((userDb) => new Client(userDb));

      return clients;
    } catch (error) {
      throw error;
    }
  };

  async getClientOldById(id) {
    const clientRepository = new ClientOldRepository();

    try {
      const clientDb = await clientRepository.getClientOldById(id);
      const client = new Client(clientDb);

      return client;
    } catch (error) {
      throw error;
    }
  };
};