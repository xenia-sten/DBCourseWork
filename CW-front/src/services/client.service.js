import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/clients/';

class ClientService {
  getClient(id){
    return axios.get(API_URL + `${id}`, { headers: authHeader() });
  }
  updateClient(id, data){
    return axios.patch(API_URL + `${id}`, data, { headers: authHeader() });
  }
  delClient(id){
    return axios.delete(API_URL + `${id}`, { headers: authHeader() });
  }
  createClient(data){
    return axios.post(API_URL, data,  { headers: authHeader() });
  }
  getVisitsByClientId(id){
    return axios.get(API_URL + `${id}/visits`, { headers: authHeader() })
  }
}

export default new ClientService();