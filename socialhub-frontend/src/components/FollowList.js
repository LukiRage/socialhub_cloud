import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserFollowings, getUserFollowers } from '../api/followings';

export default function FollowList({ userId, type }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = type === 'following' 
          ? await getUserFollowings(userId)
          : await getUserFollowers(userId);
        
        const relevantUsers = type === 'following' 
          ? data.map(f => f.followed_user)
          : data.map(f => f.user);
        setUsers(relevantUsers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userId, type]);

  return (
    <div>
      <h2>{type === 'following' ? 'Following' : 'Followers'}</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
