import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/services/';

class TemplateService {
  getTemplate(id){
    return axios.get(API_URL + `${id}`, { headers: authHeader() });
  }
  addTempalte(data){
    return axios.post(API_URL, data, { headers: authHeader() });
  }
  deleteTemplate(id){
    return axios.delete(API_URL + `${id}`, { headers: authHeader() });
  }
  updateTemplate(id, data){
    return axios.patch(API_URL + `${id}`, data, { headers: authHeader() });
  }
}

export default new TemplateService();