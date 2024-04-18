const CompanyUseCase = require('../../domain-layer/use-cases/company.use-case');

exports.getCompanies = async (req, res) => {
  const companyUseCase = new CompanyUseCase();
  try {
    if (req?.params?.companiesId) {
      const companiesId = req.params.companiesId;
      const company = await companyUseCase.getCompanyById(companiesId);

      return res.status(200).send(company);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const companies = await companyUseCase.getCompanies();

    return res.status(200).send(companies);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getUsersByCompanyId = async (req, res) => {
  console.log('Зашли в контроллеры компаний');
  const companyUseCase = new CompanyUseCase();
  try {
    if (req?.params?.companiesId) {
      const companiesId = req.params.companiesId;
      const users = await companyUseCase.getUsersByCompanyId(companiesId);

      return res.status(200).send(users);
    }

  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.getClientsByCompanyId = async (req, res) => {
  const companyUseCase = new CompanyUseCase();
  try {
    if (req?.params?.companiesId) {
      const companiesId = req.params.companiesId;
      const clients = await companyUseCase.getClientsByCompanyId(companiesId);

      return res.status(200).send(clients);
    }

  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.createCompany = async (req, res) => {
  try {
    const companyUseCase = new CompanyUseCase();
    const data = req.body;

    if (data) {
      const company = await companyUseCase.createCompany(data);

      return res.status(201).send(company);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.addUserInCompany = async (req, res) => {
  try {
    const companyUseCase = new CompanyUseCase();

    if (req?.params?.companiesId && req?.params?.userId) {
      const companiesId = req.params.companiesId;
      const userId = req.params.userId;

      const user_company = await companyUseCase.addUserInCompany(companiesId, userId);

      return res.status(201).send(user_company);
    }

  }catch (error){
    return res.status(400).send(error);
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const companyUseCase = new CompanyUseCase();
    const data = req.body;
    const id = req.params.id;

    if (data || req?.params?.id) {
      const company = await companyUseCase.updateCompany(id, data);

      return res.status(200).send(company);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.deleteCompany = async (req, res) => {
  if (req?.params?.id) {
    const id = req.params.id;

    try {
      const companyUseCase = new CompanyUseCase();
      const company = await companyUseCase.deleteCompany(id);

      return res.status(204).send(company);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
};