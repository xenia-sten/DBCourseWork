const ClientUseCase = require('../../domain-layer/use-cases/client.use-case');

exports.getClients = async (req, res) => {
  const clientUseCase = new ClientUseCase();
  try {
    if (req?.params?.clientId) {
      const id = req.params.clientId;
      const client = await clientUseCase.getClientById(id);

      return res.status(200).send(client);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const clients = await clientUseCase.getClients();

    return res.status(200).send(clients);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getVisitsByClientId = async (req, res) => {
  const clientUseCase = new ClientUseCase();
  try {
    if (req?.params?.clientId) {
      const clientId = req.params.clientId;
      const visits = await clientUseCase.getVisitsByClientId(clientId);

      return res.status(200).send(visits);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.createClient = async (req, res) => {

  try {
    const clientUseCase = new ClientUseCase();
    const data = req.body;

    if (data) {
      const client = await clientUseCase.createClient(data);

      return res.status(201).send(client);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateClient = async (req, res) => {
  try {
    const clientUseCase = new ClientUseCase();
    const data = req.body;
    if (data || req?.params?.clientId) {
      const id = req.params.clientId;
      const client = await clientUseCase.updateClient(id, data);

      return res.status(200).send(client);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.deleteClient = async (req, res) => {
  if (req?.params?.clientId) {
    const id = req.params.clientId;

    try {
      const clientUseCase = new ClientUseCase();
      const client = await clientUseCase.deleteClient(id);

      return res.status(204).send(client);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
};