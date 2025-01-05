import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/posts';
import { AuthContext } from '../../context/AuthContext';

export default function PostCreatePage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState('sample.jpg');

  async function handleCreate() {
    try {
      await createPost(currentUser.id, {
        description,
        // image,
        creation_date: new Date().toISOString()
      });
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h2>Create Post</h2>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="4"
        />
      </div>
      {/* <div className="mb-3">
        <input
          className="form-control"
          placeholder="Image name"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
      </div> */}
      <button className="btn btn-primary" onClick={handleCreate}>Create</button>
    </div>
  );
}
