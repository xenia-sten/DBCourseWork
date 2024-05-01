const UsersOldUseCase = require('../../domain-layer/use-cases/users_old.use-case');

exports.getUsersOld = async (req, res) => {
  const userUseCase = new UsersOldUseCase();
  try {
    if (req?.params?.userOldId) {
      const id = req.params.userOldId;
      const user = await userUseCase.getUserOldById(id);

      return res.status(200).send(user);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const users = await userUseCase.getUsersOld();

    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};