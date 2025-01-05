import { fetchClient } from '../utils/fetchClient';

export function getAllUsers() {
  return fetchClient('user/all', { method: 'GET' });
}

export function createUser(payload) {
  return fetchClient('user', {
    method: 'POST',
    body: payload
  });
}

export function getUserById(id) {
  return fetchClient(`user/${id}`, { method: 'GET' });
}

export function updateUser(payload) {
  return fetchClient('user', {
    method: 'PUT',
    body: payload
  });
}

export function deleteUser(id) {
  return fetchClient(`user/${id}`, { method: 'DELETE' });
}

export function uploadProfilePicture(file, userId) {
  const formData = new FormData();
  formData.append('profile_picture', file);
  formData.append('userId', userId);
  return fetchClient('user/picture', {
    method: 'POST',
    body: formData
  });
}
