import { fetchClient } from '../utils/fetchClient';

export function getGroupById(id) {
  return fetchClient(`group/${id}`, { method: 'GET' });
}

export function getAllGroups() {
  return fetchClient('group/all', { method: 'GET' });
}

export function createGroup(userId, payload) {
  return fetchClient(`group/${userId}`, {
    method: 'POST',
    body: payload
  });
}

export function updateGroup(id, payload) {
  return fetchClient(`group/${id}`, {
    method: 'PUT',
    body: payload
  });
}

export function deleteGroup(id) {
  return fetchClient(`group/${id}`, { method: 'DELETE' });
}

export function addPostInGroup(groupId, userId, payload) {
  return fetchClient(`group/${groupId}/${userId}`, {
    method: 'POST',
    body: payload
  });
}

export function addUserToGroup(groupId, userId) {
  return fetchClient(`group/add_user/${groupId}/${userId}`, { method: 'POST' });
}

export function uploadGroupCover(file, groupId) {
  const formData = new FormData();
  formData.append('groupId', groupId);
  formData.append('image', file);
  return fetchClient('group/cover', {
    method: 'POST',
    body: formData
  });
}
