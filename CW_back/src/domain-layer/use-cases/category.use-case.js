const CategoryRepository = require("../../data-layer/category.repository");
const Category = require("../entities/category.entity");
const { PropertyRequiredError, errors } = require("../../utils/error.util");

const ServiceUseCase = require('./service.use-case');

module.exports = class CategoryUseCase {

  mapFields = {
    id: 'id',
    name: 'name',
    job_id: 'job_id'
  };

  async getCategories() {
    const categoryRepository = new CategoryRepository();

    try {
      const categoryDB = await categoryRepository.getCategory();
      const categories = categoryDB.map((categoryDb) => new Category(categoryDb));

      return categories;
    } catch (error) {
      throw error;
    }
  };

  async getCategoryById(id) {
    const categoryRepository = new CategoryRepository();

    try {
      const categoryDB = await categoryRepository.getCategoryById(id);
      const category = new Category(categoryDB);

      return category;
    } catch (error) {
      throw error;
    }
  };

  async getCategoriesByJobId(id) {
    const categoryRepository = new CategoryRepository();

    try {
      const categoryDB = await categoryRepository.getCategoryById(id);
      const categories = categoryDB.map((categoryDb) => new Category(categoryDb));

      return categories;
    } catch (error) {
      throw error;
    }
  };

  async getServicesByCategoryId(categoryId) {
    const serviceUseCase = new ServiceUseCase;

    try {
      const servicesByCategory = await serviceUseCase.getServicesByCategoryId(categoryId);
      return servicesByCategory;

    } catch (error) {
      throw error;
    }
  }

  async createCategory(data) {
    const categoryRepository = new CategoryRepository();

    if (!data.fields) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const category = await categoryRepository.createCategory(data);

      return category;
    } catch (error) {
      throw error;
    }
  };

  async updateCategory(id, data) {
    const categoryRepository = new CategoryRepository();

    if (!data.fields) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const updatedCategory = await categoryRepository.updateCategory(id, data);
      const category = new Category(updatedCategory);

      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const categoryRepository = new CategoryRepository();

      if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

      const result = await categoryRepository.deleteCategory(id);
      return result;
    } catch (error) {
      throw error;
    }
  };
};