import { fetchClient } from '../utils/fetchClient';

export function getUserFollowings(userId) {
  return fetchClient(`followings/${userId}`, { method: 'GET' });
}

export function followUser(followerId, followedId) {
  return fetchClient(`followings/${followerId}/${followedId}`, { method: 'POST' });
}

export function unfollowUser(followerId, followedId) {
  return fetchClient(`followings/${followerId}/${followedId}`, { method: 'DELETE' });
}

export function getUserFollowers(userId) {
  return fetchClient(`followings/${userId}/followers`, { method: 'GET' });
}
