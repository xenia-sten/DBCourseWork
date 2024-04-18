import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/users/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'test/all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'test/user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'test/admin', { headers: authHeader() });
  }

  getJobsByUser(id){
    return axios.get(API_URL + `${id}/jobs`, { headers: authHeader() });
  }

  getCompaniesByUser(id){
    return axios.get(API_URL + `${id}/companies`, { headers: authHeader() });
  }

  getVisitsByUser(id){
    return axios.get(API_URL + `${id}/visits`, { headers: authHeader() });
  }

  updateUser(id, data){
    return axios.patch(API_URL + `${id}`, data, { headers: authHeader() });
  }
}

export default new UserService();
