import { fetchClient } from '../utils/fetchClient';

export function getComment(id) {
  return fetchClient(`comment/${id}`, { method: 'GET' });
}

export function getAllCommentsForPost(postId) {
  return fetchClient(`comment/all/${postId}`, { method: 'GET' });
}

export function createComment(postId, userId, payload) {
  return fetchClient(`comment/create_comment/${postId}/${userId}`, {
    method: 'POST',
    body: payload
  });
}

export function updateComment(payload) {
  return fetchClient('comment', {
    method: 'PUT',
    body: payload
  });
}

export function deleteComment(id) {
  return fetchClient(`comment/${id}`, { method: 'DELETE' });
}
