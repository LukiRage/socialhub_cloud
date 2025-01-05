import { fetchClient } from '../utils/fetchClient';

export function getPost(id) {
  return fetchClient(`post/${id}`, { method: 'GET' });
}

export function getPostsForUserFeed(userId) {
  return fetchClient(`post/all/${userId}`, { method: 'GET' });
}

export function createPost(userId, payload) {
  return fetchClient(`post/create/${userId}`, {
    method: 'POST',
    body: payload
  });
}

export function updatePost(payload) {
  return fetchClient('post', {
    method: 'PUT',
    body: payload
  });
}

export function deletePost(id) {
  return fetchClient(`post/${id}`, { method: 'DELETE' });
}

export function uploadPostImage(file, postId) {
  const formData = new FormData();
  formData.append('postId', postId);
  formData.append('image', file);
  return fetchClient('post/image', {
    method: 'POST',
    body: formData
  });
}
