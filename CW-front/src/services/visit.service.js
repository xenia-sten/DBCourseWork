import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/visits/';

class VisitService {
  getVisit(id) {
    return axios.get(API_URL + `${id}`, { headers: authHeader() });
  }
  deleteVisit(id) {
    return axios.delete(API_URL + `${id}`, { headers: authHeader() });
  }
  createVisit(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }
}

export default new VisitService();