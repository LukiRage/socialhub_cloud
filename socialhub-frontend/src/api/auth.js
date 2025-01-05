import { fetchClient } from '../utils/fetchClient';

export function login(payload) {
  return fetchClient('auth/login', {
    method: 'POST',
    body: payload
  });
}

export function register(payload) {
  return fetchClient('user/register', {
    method: 'POST',
    body: payload
  });
}

export function validateToken() {
  return fetchClient('auth', {
    method: 'GET'
  });
}
