import { loginUrl } from '../consts';

const sessionStorageKey = '__auth_provider_token__';

async function authenticateUser(username, password) {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  };

  return window.fetch(`${loginUrl}`, config).then(async (response) => {
    const responseData = await response.json();
    if (response.ok) {
      return 'token';
    }
    return Promise.reject(responseData);
  });
}

function handleUserResponse(token) {
  window.sessionStorage.setItem(sessionStorageKey, token);
  return token;
}

async function getToken() {
  return window.sessionStorage.getItem(sessionStorageKey);
}

function login() {
  return authenticateUser().then(handleUserResponse);
}

export { getToken, login, sessionStorageKey };
