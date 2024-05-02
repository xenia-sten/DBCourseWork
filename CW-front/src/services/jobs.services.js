import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/jobs/';

class JobsService {
  getCategoriesByJob(id){
    return axios.get(API_URL + `${id}/categories`, { headers: authHeader() });
  }
  addJob(data){
    return axios.post(API_URL, data, { headers: authHeader() });
  }
  deleteJob(id){
    return axios.delete(API_URL + `${id}`, { headers: authHeader() });
  }
}

export default new JobsService();