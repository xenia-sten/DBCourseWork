import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/companies/';

class CompanyService {
  getClientsByCompany(id){
    return axios.get(API_URL + `${id}/clients`, { headers: authHeader() });
  }
  getAllCompanies(){
    return axios.get(API_URL, { headers: authHeader() });
  }
  getUsersByCompanyId(id){
    return axios.get(API_URL + `${id}/users`, { headers: authHeader() });
  }
  createCompany(data){
    return axios.post(API_URL, data, { headers: authHeader() });
  }
  addUserInCompany(userId, companyId){
    return axios.post(API_URL + `${companyId}/users/${userId}`, { headers: authHeader() });
  }
  deleteUserInCompany(userId, companyId){
    return axios.delete(API_URL + `${companyId}/users/${userId}`, { headers: authHeader() });
  }
}

export default new CompanyService();