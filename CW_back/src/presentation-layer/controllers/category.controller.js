const CategoryUseCase = require('../../domain-layer/use-cases/category.use-case');

exports.getCategories = async (req, res) => {
  const categoryUseCase = new CategoryUseCase();
  try {
    if (req?.params?.categoryId) {
      const id = req.params.categoryId;
      const category = await categoryUseCase.getCategoryById(id);

      return res.status(200).send(category);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const categories = await categoryUseCase.getCategories();

    return res.status(200).send(categories);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getServicesByCategoryId = async (req, res) => {
  const categoryUseCase = new CategoryUseCase();
  try {
    if (req?.params?.categoryId) {
      const categoryId = req.params.categoryId;
      const services = await categoryUseCase.getServicesByCategoryId(categoryId);

      return res.status(200).send(services);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.createCategory = async (req, res) => {

  try {
    const categoryUseCase = new CategoryUseCase();
    const data = req.body;

    if (data) {
      const category = await categoryUseCase.createCategory(data);

      return res.status(201).send(category);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryUseCase = new CategoryUseCase();
    const data = req.body;
    if (data || req?.params?.categoryId) {
      const id = req.params.categoryId;
      const category = await categoryUseCase.updateCategory(id, data);

      return res.status(200).send(category);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.deleteCategory = async (req, res) => {
  if (req?.params?.categoryId) {
    const id = req.params.categoryId;

    try {
      const categoryUseCase = new CategoryUseCase();
      const category = await categoryUseCase.deleteCategory(id);

      return res.status(204).send(category);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
};