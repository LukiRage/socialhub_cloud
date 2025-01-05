import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { followUser, unfollowUser } from '../../api/followings';

export default function FollowManagePage() {
  const { followerId, followedId } = useParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(`Ready to manage follow between user ${followerId} and ${followedId}`);
  }, [followerId, followedId]);

  async function handleFollow() {
    try {
      await followUser(followerId, followedId);
      setStatus(`User ${followerId} followed ${followedId}`);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUnfollow() {
    try {
      await unfollowUser(followerId, followedId);
      setStatus(`User ${followerId} unfollowed ${followedId}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h2>Follow Manage</h2>
      <p className="mb-3">{status}</p>
      <button className="btn btn-primary me-2" onClick={handleFollow}>Follow</button>
      <button className="btn btn-danger" onClick={handleUnfollow}>Unfollow</button>
    </div>
  );
}
