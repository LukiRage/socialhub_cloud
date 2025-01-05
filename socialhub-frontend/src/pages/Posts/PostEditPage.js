import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePost } from '../../api/posts';

export default function PostEditPage() {
  const [postId, setPostId] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  async function handleUpdate() {
    try {
      await updatePost({
        id: parseInt(postId),
        description
      });
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h2>Edit Post</h2>
      <div className="mb-3">
        <label className="form-label">Post ID:</label>
        <input
          className="form-control"
          placeholder="Post ID"
          value={postId}
          onChange={e => setPostId(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          placeholder="New description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="4"
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
    </div>
  );
}
