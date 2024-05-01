import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/categories/';

class CategoryService {
  getTemplByCategory(id){
    return axios.get(API_URL + `${id}/services`, { headers: authHeader() });
  }
}

export default new CategoryService();