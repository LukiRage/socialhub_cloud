import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostsForUserFeed } from '../../api/posts';

export default function PostListPage() {
  const [userId, setUserId] = useState('1');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsForUserFeed(userId)
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div className="card">
      <h2>Posts for User {userId}</h2>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button 
          className="btn btn-primary mt-2"
          onClick={() => getPostsForUserFeed(userId).then(data => setPosts(data))}
        >
          Load
        </button>
      </div>
      <Link to={`/posts/create/${sessionStorage.getItem("userId")}`} className="btn btn-primary mb-3">
        Create Post
      </Link>
      <div className="list-group">
        {posts.map(p => (
          <Link 
            key={p.id}
            to={`/posts/${p.id}`}
            className="list-group-item list-group-item-action"
          >
            {p.description}
          </Link>
        ))}
      </div>
    </div>
  );
}
