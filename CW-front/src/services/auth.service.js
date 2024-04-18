//служба аутентификации

/*Служба предоставляет три важных метода с помощью axios для HTTP-запросов и ответов:

    login(): POST {имя пользователя, пароль} и сохранить JWTв локальном хранилище.
    logout(): удалить JWTиз локального хранилища
    register(): POST {имя пользователя, адрес электронной почты, пароль}
*/

import axios from 'axios';

const API_URL = 'http://localhost:3300/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      password: user.password
    });
  }
}

export default new AuthService();
