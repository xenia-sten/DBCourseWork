const UsersUseCase = require('../../domain-layer/use-cases/users.use-case');

exports.getUsers = async (req, res) => {
  const userUseCase = new UsersUseCase();
  try {
    if (req?.params?.userId) {
      const id = req.params.userId;
      const user = await userUseCase.getUserById(id);

      return res.status(200).send(user);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const users = await userUseCase.getUsers();

    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getCompanyByUserId = async (req, res) => {
  console.log('Зашли в контроллеры юзеров');
  const userUseCase = new UsersUseCase();
  try {
    if (req?.params?.userId) {
      const userId = req.params.userId;
      const companies = await userUseCase.getCompanyByUserId(userId);

      return res.status(200).send(companies);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.getJobsByUserId = async (req, res) => {
  const userUseCase = new UsersUseCase();
  try {
    if (req?.params?.userId) {
      const userId = req.params.userId;
      const jobs = await userUseCase.getJobsByUserId(userId);

      return res.status(200).send(jobs);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.getVisitsByUserId = async (req, res) => {
  const userUseCase = new UsersUseCase();
  try {
    if (req?.params?.userId) {
      const userId = req.params.userId;
      const visits = await userUseCase.getVisitsByUserId(userId);

      return res.status(200).send(visits);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.getRolesByUserId = async (req, res) => {
  const userUseCase = new UsersUseCase();
  try {
    if (req?.params?.userId) {
      const id = req.params.userId;
      const roles = await userUseCase.getRolesByUserId(id);
      return res.status(200).send(roles);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.createUser = async (req, res) => {

  try {
    const userUseCase = new UsersUseCase();
    const data = req.body;

    if (data) {
      const company = await userUseCase.createUser(data);

      return res.status(201).send(company);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userUseCase = new UsersUseCase();
    const data = req.body;
    const id = req.params.id;

    if (data || req?.params?.id) {
      const user = await userUseCase.updateUser(id, data);

      return res.status(200).send(user);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  if (req?.params?.id) {
    const id = req.params.id;

    try {
      const userUseCase = new UsersUseCase();
      const user = await userUseCase.deleteUser(id);

      return res.status(204).send(user);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};