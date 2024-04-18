module.exports = class Company {
  company;

  constructor(company) {
    this.company = {
      id: company.id,
      name: company.name,
      description: company.description
    };
    return this.company;
  }

  get company() {
    return this.company;
  }
};