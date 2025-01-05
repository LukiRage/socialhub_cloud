import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserFollowings, getUserFollowers } from '../../api/followings';

export default function FollowListPage() {
  const { userId, type } = useParams();
  const [relationships, setRelationships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = type === 'following' 
          ? await getUserFollowings(userId)
          : await getUserFollowers(userId);
        setRelationships(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userId, type]);

  return (
    <div className="card">
      <h2>{type === 'following' ? 'Following' : 'Followers'}</h2>
      {relationships.length === 0 ? (
        <p>No {type === 'following' ? 'following' : 'followers'} found</p>
      ) : (
        <ul className="list-group">
          {relationships.map(relationship => (
            <li key={relationship.id} className="list-group-item">
              <div className="nav-link" onClick={() => navigate(`/users/${relationship[type === 'following' ? 'followed_user' : 'user'].id}`)}>
                <strong>{relationship[type === 'following' ? 'followed_user' : 'user'].name}</strong>
                <span className="text-muted ms-2">
                  ({relationship[type === 'following' ? 'followed_user' : 'user'].email})
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
