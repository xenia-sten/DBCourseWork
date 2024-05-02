import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/categories/';

class CategoryService {
  getTemplByCategory(id){
    return axios.get(API_URL + `${id}/services`, { headers: authHeader() });
  }
  addCategory(data){
    return axios.post(API_URL, data, { headers: authHeader() });
  }
  deleteCategory(id){
    return axios.delete(API_URL + `${id}`, { headers: authHeader() });
  }
}

export default new CategoryService();