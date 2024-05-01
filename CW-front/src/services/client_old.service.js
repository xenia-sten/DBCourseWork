import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3300/api/clients_old/';

class ClientOldService {
  getClientOld(id){
    return axios.get(API_URL + `${id}`, { headers: authHeader() });
  }
}

export default new ClientOldService();