/*
  Он проверяет наличие userэлемента в локальном хранилище.
  Если есть вход в систему userс помощью accessToken(JWT),
  верните заголовок авторизации HTTP. В противном случае верните пустой объект.
*/

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
