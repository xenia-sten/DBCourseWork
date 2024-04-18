module.exports = class Category {
  category;

  constructor(category) {
    this.category = {
      id: category.id,
      name: category.name,
      description: category.description,
      job_id: category.job_id
    };
    return this.category;
  }

  get category() {
    return this.category;
  }
};