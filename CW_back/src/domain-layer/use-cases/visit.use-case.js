const VisitRepository = require("../../data-layer/visit.repository");
const Visit = require("../entities/visit.entity");
const { PropertyRequiredError, errors } = require("../../utils/error.util");

module.exports = class VisitUseCase {

  mapFields = {
    id: 'id',
    company_id: 'company_id',
    user_id: 'user_id',
    user_old_id: 'user_old_id',
    template_id: 'template_id',
    template_old_id: 'template_old_id',
    client_id: 'client_id',
    client_old_id: 'client_old_id',
    visit_date: 'visit_date',
    creation_date: 'creation_date',
    description: 'description'
  };

  async getVisits() {
    const visitRepository = new VisitRepository();

    try {
      const visitDB = await visitRepository.getVisits();
      const visits = visitDB.map((visitDb) => new Visit(visitDb));

      return visits;
    } catch (error) {
      throw error;
    }
  };

  async getVisitById(id) {
    const visitRepository = new VisitRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const visitDB = await visitRepository.getVisitById(id);
      const visit = new Visit(visitDB);

      return visit;
    } catch (error) {
      throw error;
    }
  };

  async getVisitsByUserId(id) {
    const visitRepository = new VisitRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const visitDB = await visitRepository.getVisitsByUserId(id);
      const visits = visitDB.map((visitDb) => new Visit(visitDb));

      return visits;
    } catch (error) {
      throw error;
    }
  };

  async getVisitsByClientId(id) {
    const visitRepository = new VisitRepository();

    if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

    try {
      const visitDB = await visitRepository.getVisitsByClientId(id);
      const visits = visitDB.map((visitDb) => new Visit(visitDb));

      return visits;
    } catch (error) {
      throw error;
    }
  };

  async createVisit(data) {
    const visitRepository = new VisitRepository();

    if (!data){
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const visit = await visitRepository.createVisit(data);

      return visit;
    } catch (error) {
      throw error;
    }
  };

  async updateVisit(id, data) {
    const visitRepository = new VisitRepository();

    if (!data || !id){
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const updatedVisit = await visitRepository.updateVisit(id, data);
      const visit = new Visit(updatedVisit);

      return visit;
    } catch (error) {
      throw error;
    }
  }

  async deleteVisit(id) {
    try {
      const visitRepository = new VisitRepository();

      if (!id) throw new PropertyRequiredError(errors.get("NO_PROPERTY"));

      const result = await visitRepository.deleteVisit(id);
      return result;
    } catch (error) {
      throw error;
    }
  };
};