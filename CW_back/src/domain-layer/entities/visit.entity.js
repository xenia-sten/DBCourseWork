module.exports = class Visit {
  visit;

  constructor(visit) {
    this.visit = {
      id: visit.id,
      company_id: visit.company_id,
      user_id: visit.user_id,
      user_old_id: visit.user_old_id,
      template_id: visit.template_id,
      template_old_id: visit.template_old_id,
      client_id: visit.client_id,
      client_old_id: visit.client_old_id,
      visit_date: visit.visit_date,
      creation_date: visit.creation_date,
      description: visit.description
    };
    return this.visit;
  }

  get visit() {
    return this.visit;
  }
};