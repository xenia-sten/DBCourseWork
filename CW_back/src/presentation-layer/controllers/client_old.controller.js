const ClientOldUseCase = require('../../domain-layer/use-cases/client_old.use-case');

exports.getClients = async (req, res) => {
  const clientUseCase = new ClientOldUseCase();
  try {
    if (req?.params?.clientOldId) {
      const id = req.params.clientOldId;
      const client = await clientUseCase.getClientOldById(id);

      return res.status(200).send(client);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const clients = await clientUseCase.getClientsOld();

    return res.status(200).send(clients);
  } catch (error) {
    return res.status(400).send(error);
  }
};