import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/jobs/';

class JobsService {
  getCategoriesByJob(id){
    return axios.get(API_URL + `${id}/categories`, { headers: authHeader() });
  }
}

export default new JobsService();